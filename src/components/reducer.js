export const reducer = (state, action) => {
    if (action.type === "REMOVE_ITEM") {
        return {
            ...state,
            items: state.items.filter((currElem) => {
                return currElem.id !== action.payload;
            })
        }
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: []
        }
    }

    if (action.type === "INCREMENT") {
        const clickedItem = state.items.map((item) => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        return { ...state, items: clickedItem };
    }

    if (action.type === "DECREMENT") {
        const clickedItem = state.items.map((item) => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        }).filter((item) => item.quantity !== 0)
        return { ...state, items: clickedItem };
    }

    if (action.type === "GET_TOTAL") {
        let { totalItem, totalAmount } = state.items.reduce(
            (accum, currVal) => {
                let { quantity, price } = currVal;
                let updatedTotalAmt = price * quantity;
                accum.totalItem += quantity;
                accum.totalAmount += updatedTotalAmt;
                return accum;
            },
            {
                totalItem: 0,
                totalAmount: 0
            }
        )
        return { ...state, totalItem, totalAmount };
    }
    return state;
}
