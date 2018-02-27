export function getClientState(state) {
  return {
    clientsData : state.clientInformationsReducer.clientsData,
    productData : state.clientInformationsReducer.productClient,
  };
}
