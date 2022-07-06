import {
    CREATE_ADDRESS,
    DELETE_ADDRESS,
    DELETE_ALL_ADDRESS,
    RETRIEVE_ADDRESS,
    UPDATE_ADDRESS,
} from "../actions/types";

const initialState = [];
  function addressReducer(addresses = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_ADDRESS:
        return [...addresses, payload];
      case RETRIEVE_ADDRESS:
        // console.log("RETRIEVE_ADDRESS ", payload )
        return payload;
      case UPDATE_ADDRESS:
        return addresses.map((address) => {
          if (address.id === payload.id) {
            return {
              ...address,
              ...payload,
            };
          } else {
            return address;
          }
        });
      case DELETE_ADDRESS:
        return addresses.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_ADDRESS:
        return [];
      default:
        return addresses;
    }
  };
  export default addressReducer;