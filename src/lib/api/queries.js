import axios from "axios";
import { api } from ".";

function fetchDoctors(setter) {
  axios
    .get(`${api}/doctors`)
    .then((res) => {
      setter(res.data);
    })
    .catch((err) => {
      console.error(err);
      setter([]);
    });
}

export default fetchDoctors;
