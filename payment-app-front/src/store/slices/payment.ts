import { createSlice } from "@reduxjs/toolkit";
import { CardState } from "../../utils/interfaces";



const initialState: CardState = {
    card: {
        card_number: "",
        card_holder: "",
        exp_year: "",
        exp_month: "",
        cvc: "",
    },
    type: 'none',
};


type keysICard = keyof CardState['card'];

const PaymentReducer = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
        setCard: (state, action) => {
            state.card = action.payload;
        },
        setCardAttribute: (state, action) => {
            const { id, value }: { id: keysICard, value: any } = action.payload;
            state.card[id] = value
            localStorage.setItem("credit_card", JSON.stringify(state.card));

        }
    },
});

export default PaymentReducer.reducer;
