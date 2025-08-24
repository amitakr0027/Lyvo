// models/Meeting.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  date: Date;
  duration: number;
  participants: number;
  transcript: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  participants: {
    type: Number,
    required: true,
    min: 1
  },
  transcript: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  keyPoints: [{
    type: String,
    required: true
  }],
  actionItems: [{
    type: String,
    required: true
  }],
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', MeetingSchema);