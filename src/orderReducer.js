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
  }
};
