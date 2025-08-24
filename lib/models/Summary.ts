import mongoose, { Schema, InferSchemaType, models, model } from "mongoose";

const SummarySchema = new Schema(
  {
    meeting: { type: String, required: true },
    meetingId: { type: String },
    date: { type: String },                // keep simple to match your UI
    duration: { type: String },
    participants: { type: Number, default: 0 },
    summary: { type: String, required: true },
    keyPoints: [{ type: String }],
    actionItems: { type: Number, default: 0 },
    sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },
    // optional raw transcript
    transcript: { type: String },
    createdBy: { type: String },           // Clerk userId/email later
  },
  { timestamps: true }
);

export type Summary = InferSchemaType<typeof SummarySchema>;
export default (models.Summary as mongoose.Model<Summary>) || model<Summary>("Summary", SummarySchema);
