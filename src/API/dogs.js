import axios from "axios";

import { API_KEY } from "./keys";

export default axios.create({
  baseURL: "https://api.thedogapi.com/v1/images",
  headers: {
    "x-api-key": API_KEY,
  },
});
