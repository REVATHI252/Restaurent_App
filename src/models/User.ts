import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IAddress {
  _id?: Types.ObjectId;
  label: 'Home' | 'Work' | 'Other';
  street: string;
  landmark?: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    label: {
      type: String,
      enum: ['Home', 'Work', 'Other'],
      default: 'Home',
    },
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
      required: [true, 'Area/Locality is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      default: 'Hyderabad',
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, 'Postal Pincode is required'],
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit Indian pincode'],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Omit password hash by default in queries
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        'Please enter a valid 10-digit Indian phone number',
      ],
    },
    role: {
      type: String,
      enum: {
        values: ['customer', 'admin'],
        message: 'Role must be either customer or admin',
      },
      default: 'customer',
      index: true,
    },
    addresses: {
      type: [AddressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Compound indexing
UserSchema.index({ email: 1, role: 1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
