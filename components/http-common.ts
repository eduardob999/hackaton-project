import axios from "axios";

export default axios.create({
  baseURL: "https://0950-190-169-65-7.ngrok-free.app/",
  headers: {
    "Content-type": "application/json",
  },
});