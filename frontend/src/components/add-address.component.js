import React, { useState } from "react";

import { connect } from "react-redux";
import { createAddress } from "../actions/address";
import { useLocation } from 'react-router-dom';

const AddAddress = (props) => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEMail] = useState("");
  const [phone, setPhone] = useState("");
  const [addrNumber, setAddrNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [submitted, setSubmitted] = useState(false);
  //console.log(location.state);


  function onChangeName (e) {
    setName(e.target.value);
  }
  function onChangeEMail (e) {
    setEMail(e.target.value);
  }
  function onChangePhone (e) {
    setPhone(e.target.value);
  }

  function onChangeAddrNumber (e) {
    setAddrNumber(e.target.value);
  }
  function onChangeStreet (e) {
    setStreet(e.target.value);
  }
  function onChangeCity (e) {
    setCity(e.target.value);
  }
  function onChangeCountry (e) {
    setCountry(e.target.value);
  }
  function onChangeZip (e) {
    setZip(e.target.value);
  }

  function saveAddress () {
    console.log("saveAddress with name ", name);
    props
      .createAddress(name, email, phone, addrNumber, street, city, country, zip)
      .then((data) => {
        setName(data.name);
        setEMail(data.email);
        setAddrNumber(data.addrNumber);
        setPhone(data.phone);
        setStreet(data.street);
        setCity(data.street);
        setCountry(data.country);
        setZip(data.zip);
        setSubmitted(true);
        // console.log("saved data ",data);
      })
      .catch((e) => {
        console.log(e);
        setSubmitted(false);
      });

  }
  function newAddress () {
    setName("");
    setEMail("");
    setAddrNumber("");
    setPhone("");
    setStreet("");
    setCity("");
    setCountry("");
    setZip("");
    setSubmitted(false);
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newAddress}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">{location.state.category + " Name"}</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={onChangeName}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">EMail</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={onChangeEMail}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={phone}
              onChange={onChangePhone}
              name="phone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addrNumber">#No</label>
            <input
              type="text"
              className="form-control"
              id="addrNumber"
              required
              value={addrNumber}
              onChange={onChangeAddrNumber}
              name="addrNumber"
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              className="form-control"
              id="street"
              required
              value={street}
              onChange={onChangeStreet}
              name="street"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              required
              value={city}
              onChange={onChangeCity}
              name="city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={country}
              onChange={onChangeCountry}
              name="country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip/Pin</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              required
              value={zip}
              onChange={onChangeZip}
              name="zip"
            />
          </div>


          <button onClick={saveAddress} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default connect(null, { createAddress })(AddAddress);