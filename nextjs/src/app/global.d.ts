export {};

declare global {
  interface SendRating {
    rating: number;
    ratingType: "DeliveryPersonnel" | "Product" | "Artisan";
    delivery_personnel_id?: number;
    product_id?: number;
    artisan_id?: number;
    consumer_id: number;
  }
  interface SendOrder {
    orderProducts: {
      product_id: number;
      quantity: number;
    }[];
    orderStatus: string;
    delivery_address: string;
  }

  interface Artisan {
    id: number;
    user_id: number;
    business_name: string;
    description: string;
    open_at: string;
    close_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }

  interface User {
    id: number;
    first_name: string;
    last_name: string;
    description: string;
    address: string;
    email: string;
    phone_number: string;
    user_type: string;
    email_verified_at: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    artisan: Artisan;
  }
  interface Product {
    id: number;
    name: string;
    user_id: number;
    description: string;
    price_per_piece: string;
    min_order: number;
    type: string;
    child_type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    averageRating: number;
    images: Image[];
    ratings: Rating[];
    user: User;
    orders: Order[];
  }
  interface OrderProduct extends Product {
    quantity: number;
  }
  interface Image {
    id: number;
    product_id: number;
    path: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  interface InsertProduct {
    name: string;
    description: string;
    price_per_piece: number;
    min_order: number;
    type: string;
    child_type: string;
    user_id: number;
  }
  interface Consumer {
    id: number;
    created_at: string;
    updated_at: string;
    user: User;
    order: Order;
  }

  interface Artisan {
    id: number;
    user_id: number;
    business_name: string;
    description: string;
    open_at: string;
    close_at: string;
    created_at: string;
    updated_at: string;
    user: string;
  }

  interface DeliveryPersonnel {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    availability: number;
    orders: Order[];
  }
  interface DeliveryPersonnel {
    id: number;
    created_at: string;
    updated_at: string;
    user: string;
  }

  interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    description: string;
    address: string;
    phone_number: string;
    user_type: string;
    created_at: string;
    updated_at: string;
    deliveryPersonnel: DeliveryPersonnel;
    artisan: Artisan;
    consumer: Consumer;
  }
  interface Order {
    id: number;
    order_status: string;
    delivery_address: string;
    consumer_id: number;
    delivery_personnel_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    consumer: Consumer;
    products: Product[];
    delivery_personnel: DeliveryPersonnel;
  }
}
