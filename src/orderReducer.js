export const initialState = {
  orders: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "VERIFY_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order._id.toString() === action.payload._id.toString()) {
            order.isAdminVerify = true;
            return order;
          } else {
            return order;
          }
        }),
      };
  }
};
