import {
  ERROR,
  GET_FREELANCER_DETAILS,
  GET_TASK_PROPOSALS,
  LOADING,
  GET_MY_PROCESS,
  GET_FREELANCERS,
  GET_CLIENT_DEPOSIT_HISTORY,
} from "../constants/actions-types";

const initialState = {
  freelancerDetails: undefined,
  proposals: undefined,
  loading: false,
  error: undefined,
  process: undefined,
  freelancersList: undefined,
  depositHistory: undefined,
};

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_PROCESS:
      return {
        ...state,
        process: payload,
      };
    case GET_TASK_PROPOSALS:
      return {
        ...state,
        proposals: payload,
      };
    case GET_FREELANCER_DETAILS:
      return {
        ...state,
        freelancerDetails: payload,
      };
    case GET_FREELANCERS:
      return {
        ...state,
        freelancersList: payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_CLIENT_DEPOSIT_HISTORY:
      return {
        ...state,
        depositHistory: payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
