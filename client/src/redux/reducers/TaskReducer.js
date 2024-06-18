import {
  GET_TASKS,
  ERROR,
  ADD_TASK_LOADING,
  GET_TASK_LOADING,
  GET_CLIENT_TASKS,
  UPDATE_TASK_LOADING,
  GET_TASK_DETAILS,
} from "../constants/actions-types";

const initialState = {
  tasks: [],
  taskDetails: undefined,
  client_tasks: [],
  get_task_loading: false,
  loading: false,
  error: undefined,
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TASK_DETAILS:
      return {
        ...state,
        taskDetails: payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case GET_CLIENT_TASKS:
      return {
        ...state,
        client_tasks: payload,
      };
    case ADD_TASK_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case UPDATE_TASK_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case GET_TASK_LOADING:
      return {
        ...state,
        get_task_loading: !state.get_task_loading,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
