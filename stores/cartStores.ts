// stores/cartStore.ts
import { create } from 'zustand';

interface Product {
  product_id: string;
  name: string;
  description: string;
  stock: number;
  pricePerUnit: number;
  productImage: string | null;
  category: string | null;
}

interface CartItem {
  productId: string;
  quantity: number;
  customerId: string;
  product: Product;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCart: (cart: CartItem[]) => void;
  getProductsByIds: (ids: string[]) => CartItem[];
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),

  clearCart: () => set({ cartItems: [] }),

  setCart: (cart) => set({ cartItems: cart }),

  getProductsByIds: (ids: string[]) =>
    get().cartItems.filter(item => ids.includes(item.productId)), // ✅ use productId
}));
