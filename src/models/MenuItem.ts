import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type PortionType = 'Single' | 'Regular' | 'Jumbo';
export type SpicyLevel = 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';

export interface IPortionOption {
  type: PortionType;
  price: number;
  serves: string;
}

export interface IMenuItem extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  category: Types.ObjectId;
  description: string;
  price: number; // Base price
  portionType: PortionType;
  portionOptions?: IPortionOption[];
  isVeg: boolean;
  spicyLevel: SpicyLevel;
  imageUrl: string;
  isAvailable: boolean;
  isBestseller: boolean;
  tags?: string[];
  preparationTimeMinutes?: number;
  calories?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortionOptionSchema = new Schema<IPortionOption>(
  {
    type: {
      type: String,
      enum: ['Single', 'Regular', 'Jumbo'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    serves: {
      type: String,
      default: '1 person',
    },
  },
  { _id: false }
);

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Menu item slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative'],
    },
    portionType: {
      type: String,
      enum: {
        values: ['Single', 'Regular', 'Jumbo'],
        message: '{VALUE} is not a valid portion type',
      },
      default: 'Regular',
    },
    portionOptions: {
      type: [PortionOptionSchema],
      default: [],
    },
    isVeg: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    spicyLevel: {
      type: String,
      enum: {
        values: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
        message: '{VALUE} is not a valid spice level',
      },
      default: 'Medium',
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    preparationTimeMinutes: {
      type: Number,
      default: 20,
    },
    calories: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high-performance catalog searches and filtering
MenuItemSchema.index({ category: 1, isAvailable: 1, isVeg: 1 });
MenuItemSchema.index({ isBestseller: 1, isAvailable: 1 });
MenuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem ||
  mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
