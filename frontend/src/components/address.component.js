import { deleteAddress, updateAddress } from "../actions/address";

import AddressDataService from "../services/address.service";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

function Address (props) {

  console.log("Props", props);

  let state = {
    currentAddress: {
      id: null,
      name: "",
      email: "",
      phone: "",
      addrNumber: "",
      street: "",
      city: "",
      country: "",
      zip: "",
    },
    message: "",
  };

  const { id } = useParams();
  getAddress(id);
  //this.getAddress(this.props.match.params.id);

  function onChangeName(e) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentAddress: {
          ...prevState.currentAddress,
          name: name,
        },
      };
    });
  }
  function onChangeEMail(e) {
    const email = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        email: email,
      },
    }));
  }

  function onChangePhone(e) {
    const phone = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        phone: phone,
      },
    }));
  }

  function onChangeAddrNumber(e) {
    const addrNumber = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        addrNumber: addrNumber,
      },
    }));
  }

  function onChangeStreet(e) {
    const street = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        street: street,
      },
    }));
  }


  function onChangeCity(e) {
    const city = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        city: city,
      },
    }));
  }

  function onChangeCountry(e) {
    const country = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        country: country,
      },
    }));
  }

  function onChangeZip(e) {
    const zip = e.target.value;
    this.setState((prevState) => ({
      currentAddress: {
        ...prevState.currentAddress,
        zip: zip,
      },
    }));
  }

  
  function getAddress(id) {
    AddressDataService.get(id)
      .then((response) => {
        this.setState({
          currentAddress: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function updateAddress() {
    var data = {
      id: state.currentAddress.id,
      name: state.currentAddress.name,
      email: state.currentAddress.email,
      phone: state.currentAddress.phone,
      addrNumber: state.currentAddress.addrNumber,
      street: state.currentAddress.street,
      city: state.currentAddress.city,
      country: state.currentAddress.country,
      zip: state.currentAddress.zip
    };
    props
      .updateAddress(state.currentAddress.id, data)
      .then((response) => {
        console.log(response);
        this.setState((prevState) => ({
          currentAddress: {
            ...prevState.currentAddress,
          },
        }));
        this.setState({ message: "The address was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function updateContent() {
    props
      .updateAddress(state.currentAddress.id, state.currentAddress)
      .then((response) => {
        console.log(response);

        this.setState({ message: "The address was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function removeAddress() {
    props
      .deleteAddress(state.currentAddress.id)
      .then(() => {
        props.history.push("/address");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const { currentAddress } = state;
  return (
    <div>
      {currentAddress ? (
        <div className="edit-form">
          <h4>Address</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentAddress.name}
                onChange={onChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">EMail</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={currentAddress.email}
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
                value={currentAddress.phone}
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
                value={currentAddress.addrNumber}
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
                value={currentAddress.street}
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
                value={currentAddress.city}
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
                value={currentAddress.country}
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
                value={currentAddress.zip}
                onChange={onChangeZip}
                name="zip"
              />
            </div>
          </form>
          
          <button
            className="badge badge-danger mr-2"
            onClick={removeAddress}
          >
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{state.message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Address...</p>
        </div>
      )}
    </div>
  );

}
export default connect(null, { updateAddress, deleteAddress })(Address);