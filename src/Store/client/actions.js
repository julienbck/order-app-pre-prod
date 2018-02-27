export function clientActions(dispatch) {
  return{
    fetchClients: () => {
      return fetch(`/api/fetchClients`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(result =>{
          dispatch({
            type: "DISPLAY_CLIENTS",
            data: result
          });
        }
        )
        .catch(error => {
          console.warn(error);
        });
    },
    fetchClientsByDepartement: (departmentName) => {
      return fetch(`/api/clientByDepartment/${departmentName}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(result =>{
          dispatch({
            type: "DISPLAY_CLIENTS_BY_DEPARTMENT",
            data: result
          });
        }
        )
        .catch(error => {
          console.warn(error);
        });
    },
    fetchOrderStatusTrue: () => {
      return fetch(`/api/orderStatusTrue`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(result =>{
          dispatch({
            type: "DISPLAY_ORDER_TRUE",
            data: result
          });
        }
        )
        .catch(error => {
          console.warn(error);
        });
    },
    fetchProductByClient: clientId => {
      return fetch(`/api/${clientId}/product`,{
      method: 'GET'
      })
      .then(response => response.json())
      .then(result => {
        dispatch({
          type: "DISPLAY_PRODUCT_BY_CLIENT",
          data: result
        });
      })
      .catch(error =>{
        console.warn(error);
      });
    },
    changeClientCalledStatusTrue: userId =>{
      fetch(
        `/api/clientCalled/${userId}`, {
          method : 'POST',
          headers: {"Content-Type": "application/json"},
          body : JSON.stringify({
            clientCalled : true,
          })
        }
      )
      .then(response => response.json())
      .catch(console.warn)
      window.location.reload();

    },
    changeOrderStatusTrue: userId =>{
      fetch(
        `/api/orderStatus/${userId}`, {
          method : 'POST',
          headers: {"Content-Type": "application/json"},
          body : JSON.stringify({
            orderStatus : true,
          })
        }
      )
      .then(response => response.json())
      .catch(console.warn)
      window.location.reload();

    },
    changeClientCalledStatusFalse: userId =>{
      fetch(
        `/api/clientCalled/${userId}`, {
          method : 'POST',
          headers: {"Content-Type": "application/json"},
          body : JSON.stringify({
            clientCalled : false,
          })
        }
      )
      .then(response => response.json())
      .catch(console.warn)
      window.location.reload();
    },
    changeOrderStatusFalse: userId =>{
      fetch(
        `/api/orderStatus/${userId}`, {
          method : 'POST',
          headers: {"Content-Type": "application/json"},
          body : JSON.stringify({
            orderStatus : false,
          })
        }
      )
      .then(response => {
        response.json()
      })
      .catch(console.warn)
      window.location.reload();

    },
    deleteOrderByUser: userId => {
      return fetch(`/api/order/${userId}`, {
        method: "DELETE"
      })
        .catch(error => {
          console.warn(error);
        });
    },
  }
}
