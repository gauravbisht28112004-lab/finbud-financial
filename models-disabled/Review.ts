import mongoose, { Document, Model } from 'mongoose';

export interface IReview extends Document {
  reviewerName: string;
  city: string;
  rating: number; // 1–5
  text: string;
  initials: string; // auto-derived
  isActive: boolean;
  order: number;
}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    reviewerName: { type: String, required: true, trim: true },
    city: { type: String, trim: true, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
    initials: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate initials from name
ReviewSchema.pre('save', function (next) {
  if (this.isModified('reviewerName') || !this.initials) {
    const parts = this.reviewerName.trim().split(' ');
    this.initials = parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('');
  }
  next();
});

const Review: Model<IReview> =
  mongoose.models.Review ?? mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
