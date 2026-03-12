import mongoose, { Document, Model } from 'mongoose';

export interface ISettings extends Document {
  about: {
    heading: string;
    body: string;
    mission: string;
    vision: string;
    images: string[];
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbed: string;
  };
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    linkedin: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
  };
}

const SettingsSchema = new mongoose.Schema<ISettings>({
  about: {
    heading: { type: String, default: 'A Trusted Name in Financial Services' },
    body: { type: String, default: '' },
    mission: { type: String, default: '' },
    vision: { type: String, default: '' },
    images: [{ type: String }],
  },
  contact: {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    mapEmbed: { type: String, default: '' },
  },
  social: {
    instagram: { type: String, default: '#' },
    facebook: { type: String, default: '#' },
    whatsapp: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
  },
  hero: {
    tagline: { type: String, default: 'Your Trusted Financial Partner' },
    subtitle: { type: String, default: 'A proud initiative of Finance Buddha' },
  },
});

const Settings: Model<ISettings> =
  mongoose.models.Settings ?? mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
