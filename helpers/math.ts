export const getSubtotal = (
  items: {
    price: number;
    quantity: number;
  }[]
) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};
