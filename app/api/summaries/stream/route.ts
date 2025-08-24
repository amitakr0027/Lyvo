import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Summary from "@/models/Summary";

export const runtime = "nodejs"; // ensure Node runtime (needed for change streams)

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const meetingId = searchParams.get("meetingId"); // optional filter

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: any) => {
        controller.enqueue(`data: ${JSON.stringify(payload)}\n\n`);
      };

      // greet client / help with proxies
      send({ type: "hello" });

      const pipeline: any[] = [];
      if (meetingId) pipeline.push({ $match: { "fullDocument.meetingId": meetingId } });

      const changeStream = (Summary as any).watch(pipeline, { fullDocument: "updateLookup" });

      changeStream.on("change", (change: any) => {
        // operationType: 'insert' | 'update' | 'replace' | 'delete'
        send({
          type: change.operationType,
          doc: change.fullDocument,
        });
      });

      // keep-alive
      const keepAlive = setInterval(() => controller.enqueue(`: ping\n\n`), 15000);

      // close on client abort
      (req as any).signal?.addEventListener?.("abort", () => {
        clearInterval(keepAlive);
        changeStream.close();
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
