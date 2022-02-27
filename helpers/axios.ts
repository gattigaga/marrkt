import axios from "axios";

import { apiURL } from "../config/app";

const instance = axios.create({
  baseURL: apiURL,
  timeout: 2000,
});

export default instance;
