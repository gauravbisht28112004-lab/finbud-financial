import mongoose, { Document, Model } from 'mongoose';

export interface IBank extends Document {
  name: string;
  logoUrl: string;
  website: string;
  order: number;
  isActive: boolean;
}

const BankSchema = new mongoose.Schema<IBank>(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, default: '' },
    website: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Bank: Model<IBank> =
  mongoose.models.Bank ?? mongoose.model<IBank>('Bank', BankSchema);

export default Bank;
