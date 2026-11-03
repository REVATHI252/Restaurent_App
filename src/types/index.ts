export interface CartItem {
  id: string; // menuItem._id
  name: string;
  price: number;
  quantity: number;
  portionType: 'Single' | 'Regular' | 'Jumbo';
  imageUrl: string;
  isVeg: boolean;
}

export interface MenuItemData {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  } | string;
  description: string;
  price: number;
  portionType: 'Single' | 'Regular' | 'Jumbo';
  portionOptions?: Array<{
    type: 'Single' | 'Regular' | 'Jumbo';
    price: number;
    serves: string;
  }>;
  isVeg: boolean;
  spicyLevel: 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';
  imageUrl: string;
  isAvailable: boolean;
  isBestseller: boolean;
  tags?: string[];
  preparationTimeMinutes?: number;
  calories?: number;
}

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface OutletData {
  _id: string;
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
  seatingCapacity?: string;
  specialty?: string;
  costForTwo?: string;
  valetParking?: boolean | string;
  features?: string[];
  signatureDishes?: string[];
  hygieneRating?: string;
  landmarks?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses: Array<{
    _id?: string;
    label: 'Home' | 'Work' | 'Other';
    street: string;
    landmark?: string;
    area: string;
    city: string;
    pincode: string;
    isDefault: boolean;
  }>;
}
