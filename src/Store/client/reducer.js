const initialState = {
  clientsData : [],
  productClient: [],
}

export default function clientInformationsReducer(state = initialState, action) {
  switch (action.type) {
      case "DISPLAY_CLIENTS":
        return{
          ...state,
          clientsData : action.data
        };
        case "DISPLAY_PRODUCT_BY_CLIENT":
          return{
            ...state,
            productClient: action.data
          };
          case "DISPLAY_CLIENTS_BY_DEPARTMENT":
            return{
              ...state,
              clientsData: action.data
            };
          case "DISPLAY_ORDER_TRUE":
            return{
              ...state,
              clientsData: action.data
            };
    default:
      return state;
  }
}
