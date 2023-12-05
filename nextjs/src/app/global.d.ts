
export { };

declare global {
    interface Product {
        id: string;
        name: string;
        description: string;
        price_per_piece: number;
        min_order: number;
        type: string;
        child_type: string;
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
        user: string;
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
}
