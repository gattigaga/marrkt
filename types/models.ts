// Table: product_categories
export type ProductCategory = {
  id: number;
  name?: string;
  slug?: string;
};

// Table: product_images
export type ProductImage = {
  id: number;
  product_id?: number;
  image?: string;
};

// Table: products
export type Product = {
  id: number;
  product_category_id?: number;
  name?: string;
  slug?: string;
  price?: number;
  description?: string;
  thumbnail?: string;
};

// Table: shipping_items
export type ShippingItem = {
  id: number;
  person_name?: string;
  address_1?: string;
  address_2?: string;
  admin_area_1?: string;
  admin_area_2?: string;
  postal_code?: string;
  country_code?: string;
};

// Table: cart_items
export type CartItem = {
  id: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  total?: number;
};

// Table: orders
export type Order = {
  id: number;
  user_id?: string;
  invoice_code?: string;
  items_count?: number;
  total?: number;
  shipping_item_id?: number;
  created_at?: string;
};
