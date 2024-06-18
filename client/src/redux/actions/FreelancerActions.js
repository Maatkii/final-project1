import axios from "axios";
import {
  ADD_FREELANCER_EXPERIENCE_LOADING,
  ADD_PROPOSAL_LOADING,
  GET_FREELANCER_PORTFOLIO,
  GET_FREELANCER_WITHDRAW_REQUEST,
  GET_MY_PROCESS,
  UPDATE_FREELANCER_PROFILE,
} from "../constants/actions-types";
import { successToast, url } from "../../utils";
import { current } from "./Actions";

export const getFreelancerPortfolio = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/freelancer`, config);
    dispatch({ type: GET_FREELANCER_PORTFOLIO, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const freelancerAddNewExperience =
  ({ newExperience, handleClose }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/freelancer/add-new-experience`,
        newExperience,
        config
      );
      dispatch({ type: ADD_FREELANCER_EXPERIENCE_LOADING });
      dispatch(getFreelancerPortfolio());
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
export const freelancerUpdateProfile =
  ({ updateUser, freelancerPortfolio }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/freelancer/update-profile`,
        { updateUser, freelancerPortfolio },
        config
      );

      dispatch({ type: UPDATE_FREELANCER_PROFILE });
      dispatch(getFreelancerPortfolio());
    } catch (error) {
      console.log(error);
    }
  };
export const addProposal =
  ({ proposal, id }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/freelancer/add-proposal/offer/${id}`,
        proposal,
        config
      );
      dispatch({ type: ADD_PROPOSAL_LOADING });
      successToast("Proposal Added !");
    } catch (error) {
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
    let result = await axios.get(`${url}/api/v1/freelancer/my-process`, config);
    dispatch({ type: GET_MY_PROCESS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const add_project_link =
  ({ projectLink, processId }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/freelancer/add-project-link/${processId}`,
        { projectLink },
        config
      );
      dispatch(my_process());
      successToast("project Link Added !");
    } catch (error) {
      console.log(error);
    }
  };
export const add_withdraw_request =
  ({ withdrawDetails, setLoading }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/freelancer/add-withdraw-request`,
        withdrawDetails,
        config
      );
      dispatch(get_withdraw_request());
      setLoading(false);
      successToast("Withdraw request Added !");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
export const get_withdraw_request = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(
      `${url}/api/v1/freelancer/get-withdraw-request`,
      config
    );
    dispatch({ type: GET_FREELANCER_WITHDRAW_REQUEST, payload: result.data });
  } catch (error) {
    console.log(error);
  }
};
