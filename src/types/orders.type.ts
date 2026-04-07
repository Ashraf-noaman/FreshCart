// ─── Subcategory ─────────────────────────────────────────────────────────────
interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// ─── Category ────────────────────────────────────────────────────────────────
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// ─── Brand ───────────────────────────────────────────────────────────────────
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
interface Product {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  subcategory: Subcategory[];
  category: Category;
  brand: Brand;
}

// ─── Cart Item ───────────────────────────────────────────────────────────────
interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

// ─── Shipping Address ────────────────────────────────────────────────────────
interface ShippingAddress {
  city: string;
  phone: string;
  details: string;
}

// ─── User ────────────────────────────────────────────────────────────────────
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// ─── Single Order ────────────────────────────────────────────────────────────
interface OrderI {
  _id: string;
  id: number;
  __v: number;          // ← add this
  createdAt: string;
  updatedAt: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress?: ShippingAddress;  // ← optional, not present in this response
  user: User;
  cartItems: CartItem[];
}

