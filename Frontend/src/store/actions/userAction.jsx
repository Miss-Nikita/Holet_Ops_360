import {
  currentUserService,
  loginService,
  logoutService,
  signupService,
} from "../../api/userServices";
import { login, logout } from "../reducers/userSlices";

export const asynccurrentuser = () => async (dispatch) => {
  const user = await currentUserService();
  dispatch(login(user));
  !user && dispatch(logout());
};

export const asyncsignup = (user) => async (dispatch) => {
  const data = await signupService(user);
  dispatch(asynccurrentuser());
};

export const asynclogin = (user) => async (dispatch) => {
  const data = await loginService(user);
  dispatch(asynccurrentuser());
  return data;
};

export const asynclogout = (user) => async (dispatch) => {
  const data = await logoutService();
  dispatch(logout());
};
