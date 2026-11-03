import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IFeedback extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  outletName: string;
  rating: number; // 1 to 5
  category: 'Food Quality' | 'Delivery Speed' | 'Packaging' | 'Dine-in Experience' | 'General';
  favoriteDish?: string;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    outletName: {
      type: String,
      default: 'Secunderabad Flagship',
    },
    rating: {
      type: Number,
      required: [true, 'Please select a star rating'],
      min: 1,
      max: 5,
      index: true,
    },
    category: {
      type: String,
      enum: ['Food Quality', 'Delivery Speed', 'Packaging', 'Dine-in Experience', 'General'],
      default: 'Food Quality',
    },
    favoriteDish: {
      type: String,
      trim: true,
    },
    comments: {
      type: String,
      required: [true, 'Please provide your feedback comments'],
      maxlength: [1000, 'Comments cannot exceed 1000 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

FeedbackSchema.index({ rating: -1, createdAt: -1 });

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
