export const initialState = {
  orders: null,
  stores: null
};

export const reducer = (state, action) => {

  const { type, payload } = action

  switch (type) {
    case "GET_ALL_ORDERS":
      return {
        ...state,
        orders: payload,
      };

    case "GET_ALL_STORES":
      return {
        ...state,
        stores: payload
      }
    case "VERIFY_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order._id.toString() === payload._id.toString()) {
            order.isAdminVerify = true;
            return order;
          } else {
            return order;
          }
        }),
      };
  }
};
