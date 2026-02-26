import mongoose, { Document, Model } from 'mongoose';

export type StaffType = 'hr' | 'manager' | 'leader';

export interface IStaff extends Document {
  name: string;
  role: string;
  department: string;
  type: StaffType;
  photoUrl: string;
  order: number;
  isActive: boolean;
  linkedin?: string;
  email?: string;
}

const StaffSchema = new mongoose.Schema<IStaff>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    department: { type: String, trim: true, default: '' },
    type: {
      type: String,
      enum: ['hr', 'manager', 'leader'],
      required: true,
    },
    photoUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    linkedin: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  { timestamps: true }
);

const Staff: Model<IStaff> =
  mongoose.models.Staff ?? mongoose.model<IStaff>('Staff', StaffSchema);

export default Staff;
