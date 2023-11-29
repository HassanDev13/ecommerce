
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

}
