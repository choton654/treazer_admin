export const initialState = {
  orders: null,
  stores: null,
  singleStore: null
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
    case "VERIFY_STORES":
      return {
        ...state,
        stores: state.stores.map(store => {
          if (store._id.toString() === payload.toString()) {
            store.isVerified = true
            return store
          } else {
            return store
          }
        })
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
    case "SET_SINGLE_STORE":
      return {
        ...state,
        singleStore: payload
      }
  }
};
