import { GET } from "../utils/axios";
import ENDPOINTS from "../utils/endpoints";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return GET(ENDPOINTS.GET_USERS)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};