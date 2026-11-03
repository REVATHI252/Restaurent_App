import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IOutlet extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  timings: string;
  lat: number;
  lng: number;
  isFlagship?: boolean;
  hasDineIn: boolean;
  hasTakeaway: boolean;
  hasDelivery: boolean;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OutletSchema = new Schema<IOutlet>(
  {
    name: {
      type: String,
      required: [true, 'Outlet name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Outlet slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    area: {
      type: String,
      required: [true, 'Locality / Area is required'],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      default: 'Hyderabad',
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: [true, 'Full address is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    timings: {
      type: String,
      default: '11:00 AM - 11:30 PM (All Days)',
    },
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
    },
    isFlagship: {
      type: Boolean,
      default: false,
    },
    hasDineIn: {
      type: Boolean,
      default: true,
    },
    hasTakeaway: {
      type: Boolean,
      default: true,
    },
    hasDelivery: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

OutletSchema.index({ city: 1, area: 1, isActive: 1 });

const Outlet: Model<IOutlet> =
  mongoose.models.Outlet || mongoose.model<IOutlet>('Outlet', OutletSchema);

export default Outlet;
