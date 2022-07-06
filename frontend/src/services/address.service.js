import http from "../http-common";
class AddressDataService {
  getAll() {
    return http.get("/address");
  }
  get(id) {
    return http.get(`/address/${id}`);
  }
  create(data) {
    return http.post("/address", data);
  }
  update(id, data) {
    return http.put(`/address/${id}`, data);
  }
  delete(id) {
    return http.delete(`/address/${id}`);
  }
  deleteAll() {
    return http.delete(`/address`);
  }
  findByName(name) {
    return http.get(`/address?name=${name}`);
  }
}
export default new AddressDataService();