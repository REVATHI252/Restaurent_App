import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IReservation extends Document {
  _id: Types.ObjectId;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  outletName: string;
  reservationDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "07:30 PM"
  guestsCount: number;
  seatingPreference: 'Royal AC Dining' | 'Heritage Family Lounge' | 'VIP Private Dining' | 'Terrace View';
  occasion?: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
    },
    outletName: {
      type: String,
      required: [true, 'Outlet selection is required'],
      default: 'Secunderabad Flagship',
    },
    reservationDate: {
      type: String,
      required: [true, 'Reservation date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    guestsCount: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'Minimum 1 guest'],
      max: [50, 'For groups larger than 50, please call our banquet manager'],
    },
    seatingPreference: {
      type: String,
      enum: ['Royal AC Dining', 'Heritage Family Lounge', 'VIP Private Dining', 'Terrace View'],
      default: 'Royal AC Dining',
    },
    occasion: {
      type: String,
      trim: true,
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['confirmed', 'seated', 'cancelled', 'completed'],
      default: 'confirmed',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ReservationSchema.index({ outletName: 1, reservationDate: 1, timeSlot: 1 });

const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>('Reservation', ReservationSchema);

export default Reservation;
