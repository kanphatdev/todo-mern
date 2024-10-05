import axios from "axios";

const ENDPOINT = "http://localhost:5000/api/todo";

export const getData = async () => {
  return await axios.get(ENDPOINT);
};
export const removeData = async (id) => {
    return await axios.delete(`${ENDPOINT}/${id}`);
  };
  export const createData = async (data) => {
    return await axios.post(ENDPOINT,data);
  };
  export const updateData = async (id, data) => {
    return await axios.put(`${ENDPOINT}/${id}`, data);
  };
  