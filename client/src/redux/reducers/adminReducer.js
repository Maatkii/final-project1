import {
  GET_ADMIN_CLIENT_LIST,
  GET_ADMIN_DEPOSIT_HISTORY,
  GET_ADMIN_FREELANCERS_LIST,
  GET_ADMIN_PROCESS_LIST,
  GET_ADMIN_RECLAMATIONS,
  GET_ADMIN_WITHDRAW_REQUEST,
} from "../constants/actions-types";

const initialState = {
  clientList: undefined,
  freelancerList: undefined,
  processList: undefined,
  reclamations: undefined,
  depositList: undefined,
  withdrawRequest: undefined,
};

const clientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADMIN_CLIENT_LIST:
      return {
        ...state,
        clientList: payload,
      };
    case GET_ADMIN_FREELANCERS_LIST:
      return {
        ...state,
        freelancerList: payload,
      };
    case GET_ADMIN_PROCESS_LIST:
      return {
        ...state,
        processList: payload,
      };
    case GET_ADMIN_RECLAMATIONS:
      return {
        ...state,
        reclamations: payload,
      };
    case GET_ADMIN_DEPOSIT_HISTORY:
      return {
        ...state,
        depositList: payload,
      };
    case GET_ADMIN_WITHDRAW_REQUEST:
      return {
        ...state,
        withdrawRequest: payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
