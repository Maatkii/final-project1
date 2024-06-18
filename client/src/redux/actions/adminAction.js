import {
  GET_ADMIN_CLIENT_LIST,
  GET_ADMIN_DEPOSIT_HISTORY,
  GET_ADMIN_FREELANCERS_LIST,
  GET_ADMIN_PROCESS_LIST,
  GET_ADMIN_RECLAMATIONS,
  GET_ADMIN_WITHDRAW_REQUEST,
} from "../constants/actions-types";
import axios from "axios";
import { errorToast, successToast, url } from "../../utils";

export const admin_get_clients = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/admin/list-users/client`, config)
    .then(async (response) => {
      dispatch({ type: GET_ADMIN_CLIENT_LIST, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const admin_get_freelancers = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/admin/list-users/freelancer`, config)
    .then(async (response) => {
      dispatch({ type: GET_ADMIN_FREELANCERS_LIST, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};

export const admin_get_process = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/admin/process-list`, config)
    .then(async (response) => {
      dispatch({ type: GET_ADMIN_PROCESS_LIST, payload: response.data.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const get_admin_reclamations = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/admin/reclamations`, config)
    .then(async (response) => {
      dispatch({ type: GET_ADMIN_RECLAMATIONS, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const admin_approval_payment = (id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .put(`${url}/api/v1/admin/approval-payment/${id}`, config)
    .then(async (response) => {
      dispatch(get_admin_deposit_list());
      successToast("Payment Approval");
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const get_admin_deposit_list = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/admin/deposit-history`, config)
    .then(async (response) => {
      dispatch({ type: GET_ADMIN_DEPOSIT_HISTORY, payload: response.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const admin_delete_client = (id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .delete(`${url}/api/v1/admin/delete-client/${id}`, config)
    .then(async (response) => {
      dispatch(admin_get_clients()); // Refresh client list after deletion
      successToast("Client deleted successfully");
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};

export const admin_delete_freelancer = (id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .delete(`${url}/api/v1/admin/delete-Freelancer/${id}`, config)
    .then(async (response) => {
      dispatch(admin_get_freelancers()); // Refresh Freelancer list after deletion
      successToast("Freelancer deleted successfully");
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};

export const get_withdraw_requests = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/admin/get-withdraw-request`,
      config
    );
    dispatch({ type: GET_ADMIN_WITHDRAW_REQUEST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
export const approval_withdraw_requests = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.put(
      `${url}/api/v1/admin/approval-withdraw-request/${id}`,
      config
    );
    successToast("Withdraw Approval");
    dispatch(get_withdraw_requests());
  } catch (error) {
    console.log(error);
  }
};
