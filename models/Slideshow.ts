import mongoose, { Document, Model } from 'mongoose';

export interface ISlide extends Document {
  title: string;
  subtitle: string;
  imageUrl: string;
  gradient: string; // fallback CSS gradient
  order: number;
  isActive: boolean;
}

const SlideSchema = new mongoose.Schema<ISlide>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: '' },
    imageUrl: { type: String, default: '' },
    gradient: { type: String, default: 'linear-gradient(135deg,#1B4FD8,#00B4D8)' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Slideshow: Model<ISlide> =
  mongoose.models.Slideshow ?? mongoose.model<ISlide>('Slideshow', SlideSchema);

export default Slideshow;
