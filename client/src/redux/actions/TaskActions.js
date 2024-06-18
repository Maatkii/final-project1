import axios from "axios";
import {
  ADD_TASK_LOADING,
  GET_CLIENT_TASKS,
  GET_TASKS,
  GET_TASK_DETAILS,
  GET_TASK_LOADING,
  UPDATE_TASK_LOADING,
} from "../constants/actions-types";
import { url } from "../../utils";
export const get_All_Tasks = () => async (dispatch) => {
  try {
    let result = await axios.get(`${url}/api/v1/auth/offers`);
    dispatch({ type: GET_TASKS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const get_Tasks_details = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`${url}/api/v1/auth/offer/${id}`);
    dispatch({ type: GET_TASK_DETAILS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const getClientTask = () => async (dispatch) => {
  dispatch({ type: GET_TASK_LOADING });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.get(`${url}/api/v1/client/my-offer`, config);
    dispatch({ type: GET_CLIENT_TASKS, payload: result.data.data });
  } catch (error) {
    console.log(error);
  }
};
export const addTask =
  ({ post, navigate }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.post(
        `${url}/api/v1/client/add-offer`,
        post,
        config
      );
      if (result.status) {
        navigate("/manage-tasks");
        dispatch({ type: ADD_TASK_LOADING });
        dispatch(getClientTask());
      }
    } catch (error) {
      console.log(error);
    }
  };
export const updateTaskAction =
  ({ post, handleClose }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      let result = await axios.put(
        `${url}/api/v1/client/update-offer/${post._id}`,
        post,
        config
      );
      if (result.status) {
        handleClose();
        dispatch({ type: UPDATE_TASK_LOADING });
        dispatch(getClientTask());
      }
    } catch (error) {
      console.log(error);
    }
  };
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios.delete(
      `${url}/api/v1/client/delete-offer/${taskId}`,
      config
    );
    if (result.status) {
      dispatch(getClientTask());
    }
  } catch (error) {
    console.log(error);
  }
};
