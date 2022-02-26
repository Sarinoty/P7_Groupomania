import { GET, PATCH } from "../utils/axios";
import endpoints from "../utils/endpoints";

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = (uid) => {
    return (dispatch) => {
      return GET(`${endpoints.GET_USER}${uid}`)
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };

export const updateUser = (uid, data) => {
  return () => {
    return PATCH(`${endpoints.UPDATE_USER}${uid}`, data)
      .catch((err) => console.log(err));
  }
}