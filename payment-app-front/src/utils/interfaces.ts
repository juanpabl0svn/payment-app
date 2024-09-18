export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export enum States {
    LOADING,
    ERROR,
    SUCCESS,
    NULL
}

export interface ProductState {
    items: IProduct[];
    status: States;
}


export interface UserState {
    isLoggedIn: boolean;
    email: string | null;
    name: string | null;
}

export interface ICard {
    card_number: string;
    card_holder: string;
    exp_year: string;
    exp_month: string;
    cvc: string;
}


export interface CardState {
    card: ICard;
    type: 'mastercard' | 'visa' | 'none';

}


interface PaymentMethod {
    type: string;
    extra: {
        bin: string;
        brand: string;
        card_type: string;
        last_four: string;
        card_holder: string;
        installments: number;
        exp_year?: string;
        exp_month?: string;
        is_three_ds?: boolean;
        unique_code?: string;
        three_ds_auth?: {
            current_step: string;
            current_step_status: string;
        };
        external_identifier?: string;
        processor_response_code?: string;
    };
    token: string;
}

interface CustomerData {
    full_name: string;
}

interface Itransaction {
    id: string;
    created_at: string;
    finalized_at: string;
    amount_in_cents: number;
    reference: string;
    customer_email: string;
    currency: string;
    payment_method: PaymentMethod;
    status: string;
    status_message: string | null;
    shipping_address: string | null;
    redirect_url: string | null;
    payment_source_id: string | null;
    payment_link_id: string | null;
    customer_data: CustomerData;
    billing_data: string | null;
}

export interface TransactionState {
    transaction: Itransaction | null
    status: States;
}


