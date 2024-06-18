import {
  CURRENT_USER,
  ERROR,
  GET_USER_RECLAMATION,
  LOADING,
  LOGIN_USER,
  NOTIFICATIONS,
} from "../constants/actions-types";

const initialState = {
  user: {},
  userLoading: true,
  isAuth: false,
  loading: false,
  role: "",
  error: undefined,
  notification: [],
  reclamations: undefined,
};

const LoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      localStorage.setItem("accessToken", payload);
      return {
        ...state,
        loading: true,
        isAuth: true,
        role: payload.role,
        error: undefined,
      };
    case CURRENT_USER:
      return {
        ...state,
        loading: false,
        user: payload.user,
        userLoading: false,
        isAuth: true,
      };
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        notification: payload,
      };
    case GET_USER_RECLAMATION:
      return {
        ...state,
        reclamations: payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
