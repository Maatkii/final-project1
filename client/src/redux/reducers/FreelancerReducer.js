import {
  ADD_FREELANCER_EXPERIENCE_LOADING,
  ADD_PROPOSAL_LOADING,
  ERROR,
  GET_FREELANCER_PORTFOLIO,
  UPDATE_FREELANCER_PROFILE,
  GET_MY_PROCESS,
  GET_FREELANCER_WITHDRAW_REQUEST,
} from "../constants/actions-types";

const initialState = {
  freelancerPortfolio: undefined,
  loading: false,
  error: undefined,
  process: [],
  withdrawRequest: undefined,
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_PROCESS:
      return {
        ...state,
        process: payload,
      };
    case ADD_PROPOSAL_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case UPDATE_FREELANCER_PROFILE:
      return {
        ...state,
        loading: !state.loading,
      };
    case ADD_FREELANCER_EXPERIENCE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case GET_FREELANCER_PORTFOLIO:
      return {
        ...state,
        freelancerPortfolio: payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_FREELANCER_WITHDRAW_REQUEST:
      return {
        ...state,
        withdrawRequest: payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
