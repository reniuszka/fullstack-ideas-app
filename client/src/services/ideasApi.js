import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiUrl = "/api/ideas";
    // this._apiUrl = 'http://localhost:5000/api/ideas';

    console.log(process.env.NODE_ENV);
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }
  //data comes from the form (ideaForm)
  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }
  //taking id and data, return link and , data
  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }
  //delete on the server
  deleteIdea(id) {
    //check if names is there
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}
//inicjalizja
export default new IdeasApi();
