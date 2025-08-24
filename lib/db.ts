import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectDB() {
  if (!global.__mongooseConn) {
    global.__mongooseConn = mongoose.connect(MONGODB_URI, {
      dbName: "meeting-summaries",
    });
    mongoose.connection.on("connected", () => {
      console.log("[Mongo] connected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("[Mongo] connection error:", err);
    });
  }
  return global.__mongooseConn;
}
