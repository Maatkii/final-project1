import axios from "axios";
import {
  GET_CLIENT_DEPOSIT_HISTORY,
  GET_FREELANCER_DETAILS,
  GET_FREELANCERS,
  GET_MY_PROCESS,
  GET_TASK_PROPOSALS,
} from "../constants/actions-types";
import { errorToast, successToast, url } from "../../utils";
import { current } from "./Actions";
export const get_freelancer_details = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/client/freelancer-portfolio/${id}`,
      config
    );
    dispatch({ type: GET_FREELANCER_DETAILS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_proposals = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/client/offer/${id}/proposals`,
      config
    );
    dispatch({ type: GET_TASK_PROPOSALS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const update_client_profile =
  ({ user, setLoading }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/client/update-profile`,
        user,
        config
      );
      setLoading(false);
      dispatch(current());
      successToast("Profile Updated ! ");
    } catch (error) {
      errorToast(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
export const my_process = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/client/offer-accepted`, config);
    dispatch({ type: GET_MY_PROCESS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const accept_process =
  ({ offerAccepted, navigate }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/client/offer/accept-offer`,
        offerAccepted,
        config
      );
      dispatch(my_process());
      navigate("/manage-active-tasks");
    } catch (error) {
      console.log(error);
    }
  };
export const make_payment = (processId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.put(
      `${url}/api/v1/client/payment/make-payment/${processId}`,
      {},
      config
    );
    dispatch(my_process());
    dispatch(current());
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
export const get_freelancers_profile = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/client/freelancers-list`,
      config
    );
    dispatch({ type: GET_FREELANCERS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const deposit_money =
  ({ depositDetails, setLoading }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/client/deposit-money`,
        depositDetails,
        config
      );
      setLoading(false);
      dispatch(get_client_deposit_history());
      successToast("Depost Request Added ! ");
    } catch (error) {
      errorToast(error.message);
      setLoading(false);
      console.log(error);
    }
  };
export const get_client_deposit_history = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/client/deposit-history`, config)
    .then(async (response) => {
      dispatch({ type: GET_CLIENT_DEPOSIT_HISTORY, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
