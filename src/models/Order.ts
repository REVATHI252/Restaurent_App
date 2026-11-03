import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IAddress } from './User';

export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type OrderStatus =
  | 'received'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';
export type PaymentMethod = 'cod' | 'upi' | 'card' | 'netbanking';

export interface IOrderItem {
  menuItem: Types.ObjectId;
  name: string;
  quantity: number;
  unitPrice: number;
  portionType?: string;
  totalPrice: number;
  imageUrl?: string;
}

export interface IOrderDeliveryAddress extends Omit<IAddress, '_id'> {
  recipientName: string;
  recipientPhone: string;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  orderNumber: string;
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number; // Subtotal of items
  discountAmount: number; // Applied discount/coupon
  taxAmount: number; // GST (5% for restaurants)
  deliveryFee: number;
  finalAmount: number; // (totalAmount - discountAmount + taxAmount + deliveryFee)
  deliveryAddress: IOrderDeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string;
  orderStatus: OrderStatus;
  specialInstructions?: string;
  estimatedDeliveryTime?: Date;
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: [true, 'Menu item reference is required'],
    },
    name: {
      type: String,
      required: [true, 'Item name snapshot is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative'],
    },
    portionType: {
      type: String,
      default: 'Regular',
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
    imageUrl: {
      type: String,
    },
  },
  { _id: false }
);

const OrderDeliveryAddressSchema = new Schema<IOrderDeliveryAddress>(
  {
    recipientName: {
      type: String,
      required: [true, 'Recipient name is required'],
      trim: true,
    },
    recipientPhone: {
      type: String,
      required: [true, 'Recipient phone is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'],
    },
    label: {
      type: String,
      enum: ['Home', 'Work', 'Other'],
      default: 'Home',
    },
    street: {
      type: String,
      required: [true, 'Street address is required'],
    },
    landmark: {
      type: String,
    },
    area: {
      type: String,
      required: [true, 'Area is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      default: 'Hyderabad',
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit Indian pincode'],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    items: {
      type: [OrderItemSchema],
      required: [true, 'Order must contain at least one item'],
      validate: [
        (val: IOrderItem[]) => val.length > 0,
        'Order items list cannot be empty',
      ],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total subtotal amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
    },
    taxAmount: {
      type: Number,
      required: [true, 'Tax amount is required'],
      min: [0, 'Tax amount cannot be negative'],
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: [0, 'Delivery fee cannot be negative'],
    },
    finalAmount: {
      type: Number,
      required: [true, 'Final calculated amount is required'],
      min: [0, 'Final amount cannot be negative'],
    },
    deliveryAddress: {
      type: OrderDeliveryAddressSchema,
      required: [true, 'Delivery address is required'],
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'upi', 'card', 'netbanking'],
      default: 'upi',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      index: true,
    },
    paymentTransactionId: {
      type: String,
      trim: true,
    },
    orderStatus: {
      type: String,
      enum: ['received', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'received',
      index: true,
    },
    specialInstructions: {
      type: String,
      maxlength: [500, 'Special instructions cannot exceed 500 characters'],
    },
    estimatedDeliveryTime: {
      type: Date,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ['received', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// High-speed querying indexes
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1, createdAt: -1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
