// // models/Summary.js
// import mongoose from 'mongoose';

// const SummarySchema = new mongoose.Schema({
//   meeting: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   duration: {
//     type: String,
//     required: true,
//   },
//   participants: {
//     type: Number,
//     required: true,
//   },
//   summary: {
//     type: String,
//     required: true,
//   },
//   keyPoints: [{
//     type: String,
//     required: true,
//   }],
//   actionItems: {
//     type: Number,
//     required: true,
//   },
//   sentiment: {
//     type: String,
//     enum: ['positive', 'neutral', 'negative'],
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Summary || mongoose.model('Summary', SummarySchema);


import { Schema, model, models } from "mongoose";

const ActionItem = new Schema(
  {
    owner: { type: String, default: "all" }, // e.g. "@sarah" or "all"
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const SummarySchema = new Schema(
  {
    meetingId: { type: String, required: true, index: true },
    source: { type: String, enum: ["manual", "transcript"], default: "manual" },
    transcript: String,
    notes: String,

    summary: String,
    keyPoints: [String],
    actionItems: [ActionItem],
    sentiment: { type: String, enum: ["positive", "neutral", "negative"], default: "neutral" },

    status: { type: String, enum: ["pending", "ready", "failed"], default: "pending", index: true },
  },
  { timestamps: true }
);

export default models.Summary || model("Summary", SummarySchema);
