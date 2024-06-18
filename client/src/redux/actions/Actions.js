import {
  CURRENT_USER,
  ERROR,
  GET_USER_RECLAMATION,
  LOADING,
  LOGIN_USER,
  NOTIFICATIONS,
} from "../constants/actions-types";
import axios from "axios";
import { errorToast, successToast, url } from "../../utils";
export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios
      .get(`${url}/api/v1/auth/current`, config)
      .then((res) => dispatch({ type: CURRENT_USER, payload: res.data }))
      .catch((err) => {
        if (err.response.data.message === "Invalid token") {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      });
  } catch (error) {
    console.log(error);
  }
};
export const register =
  ({ registredUser, navigate }) =>
  (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post(`${url}/api/v1/auth/register`, registredUser)
      .then((response) => {
        dispatch({ type: LOADING });
        successToast(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        dispatch({ type: LOADING });
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
export const login =
  ({ loginDetails, navigate }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post(`${url}/api/v1/auth/login`, loginDetails)
      .then(async (response) => {
        await dispatch({ type: LOGIN_USER, payload: response.data.data });
        await dispatch(current());
        navigate("/task-list");
        successToast(response.data.message);
      })
      .catch((err) => {
        errorToast(err.response.data.message);
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
export const notifications = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/auth/notifications`, config)
    .then(async (response) => {
      await dispatch({ type: NOTIFICATIONS, payload: response.data.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const Make_notification_readed = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .put(`${url}/api/v1/auth/make-notification-readed`, {}, config)
    .then(async (response) => {
      await dispatch(notifications());
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const send_password_reset =
  ({ resetCode, email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    axios
      .post(
        `${url}/api/v1/auth/send_reset_password`,
        { resetCode, email },
        config
      )
      .then(async (response) => {})
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
export const change_password =
  ({ password, email, navigate }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    axios
      .post(`${url}/api/v1/auth/change-password`, { password, email }, config)
      .then(async (response) => {
        navigate("/login");
        successToast("Password Changed ! ");
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
export const add_reclamation =
  ({ description, setLoading, setDescription }) =>
  async (dispatch) => {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    axios
      .post(`${url}/api/v1/auth/add-reclamation`, { description }, config)
      .then(async (response) => {
        setLoading(false);
        successToast("Reclamation Added ! ");
        alert("Administrator will Contact you soon ! ");
        setDescription("");
      })
      .catch((err) => {
        errorToast(err.response.data.message);
      });
  };
export const get_user_reclamations = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/auth/users-reclamation`, config)
    .then(async (response) => {
      dispatch({ type: GET_USER_RECLAMATION, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
