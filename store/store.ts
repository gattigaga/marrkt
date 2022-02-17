import create from "zustand";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
};

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type State = {
  cartItems: CartItem[];
};

export const useStore = create<State>((set) => ({
  cartItems: [],
  addToCart: (item: CartItem) => {
    set((state) => {
      const isItemAlreadyExists = state.cartItems.find((cartItem) => {
        return cartItem.product.id === item.product.id;
      });

      if (isItemAlreadyExists) {
        return {
          cartItems: state.cartItems.map((cartItem) => {
            if (cartItem.product.id === item.product.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }

            return cartItem;
          }),
        };
      }

      return {
        cartItems: [...state.cartItems, item],
      };
    });
  },
  removeFromCart: (itemId: string) => {
    set((state) => {
      return {
        cartItems: state.cartItems.filter((item) => item.id !== itemId),
      };
    });
  },
  increaseItemQty: (itemId: string) => {
    set((state) => {
      return {
        cartItems: state.cartItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        }),
      };
    });
  },
  decreaseItemQty: (itemId: string) => {
    set((state) => {
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item?.quantity === 1) {
        return {
          cartItems: state.cartItems.filter((item) => item.id === itemId),
        };
      }

      return {
        cartItems: state.cartItems.map((item) => {
          if (item.id === itemId && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        }),
      };
    });
  },
}));
