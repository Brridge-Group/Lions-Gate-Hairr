import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
