import React, { Component } from "react";
import { deleteAllAddress, findAddressByName, retrieveAddress } from "../actions/address";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveAddress = this.setActiveAddress.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllAddress = this.removeAllAddress.bind(this);
    this.state = {
      currentAddress: null,
      currentIndex: -1,
      searchName: "",
    };
  }
  componentDidMount() {
    this.props.retrieveAddress();
  }
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName,
    });
  }
  refreshData() {
    this.setState({
      currentAddress: null,
      currentIndex: -1,
    });
  }
  setActiveAddress(address, index) {
    this.setState({
      currentAddress: address,
      currentIndex: index,
    });
  }
  removeAllAddress() {
    this.props
      .deleteAllAddress()
      .then((response) => {
        //console.log("removeAllAddress",response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  findByName() {
    this.refreshData();
    this.props.findAddressByName(this.state.searchName);
  }
  render() {
    const { searchName, currentAddress, currentIndex } = this.state;
    const { addresses } = this.props;
    return (
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Address List</h4>
          <ul className="list-group">
            {addresses &&
              addresses.map((address, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAddress(address, index)}
                  key={index}
                >
                  {address.name}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAddress}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAddress ? (
            <div>
              <h4>Address</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentAddress.name}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentAddress.email}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentAddress.phone}
              </div>
              <div>
                <label>
                  <strong>No#:</strong>
                </label>{" "}
                {currentAddress.addrNumber}
              </div>
              <div>
                <label>
                  <strong>Street:</strong>
                </label>{" "}
                {currentAddress.street}
              </div>
              <div>
                <label>
                  <strong>City:</strong>
                </label>{" "}
                {currentAddress.city}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentAddress.country}
              </div>
              <div>
                <label>
                  <strong>Zip/Pin Code:</strong>
                </label>{" "}
                {currentAddress.zip}
              </div>
              <Link
                to={"/addresses/" + currentAddress.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Address...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("mapStateToProps ,...", state)
  return {
    addresses: state.address,
  };
};
export default connect(mapStateToProps, { retrieveAddress, findAddressByName, deleteAllAddress })(AddressList);