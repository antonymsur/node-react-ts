import {
    CREATE_ADDRESS,
    DELETE_ADDRESS,
    DELETE_ALL_ADDRESS,
    RETRIEVE_ADDRESS,
    UPDATE_ADDRESS
} from "./types";

import AddressDataService from "../services/address.service";

export const createAddress = (name, email, phone, addrNumber, street, city, country, zip) => async (dispatch) => {
  console.log("createAddress with name ",name);
    try {
      const res = await AddressDataService.create({ name, email, phone, addrNumber, street, city, country, zip });
      dispatch({
        type: CREATE_ADDRESS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveAddress = () => async (dispatch) => {
    try {
      const res = await AddressDataService.getAll();
      // console.log("response data ",res.data, "hello" )
      dispatch({
        type: RETRIEVE_ADDRESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const updateAddress = (id, data) => async (dispatch) => {
    try {
      const res = await AddressDataService.update(id, data);
      dispatch({
        type: UPDATE_ADDRESS,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteAddress = (id) => async (dispatch) => {
    try {
      await AddressDataService.delete(id);
      dispatch({
        type: DELETE_ADDRESS,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteAllAddress = () => async (dispatch) => {
    try {
      const res = await AddressDataService.deleteAll();
      dispatch({
        type: DELETE_ALL_ADDRESS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const findAddressByName = (name) => async (dispatch) => {
    try {
      const res = await AddressDataService.findByName(name);
      dispatch({
        type: RETRIEVE_ADDRESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };