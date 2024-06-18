import axios from "axios";
import { url } from "../../utils";
import {
  ADDCHAT,
  ADDCHATDATA,
  ADDNOTIFICATION,
} from "../constants/actions-types";
import { toast } from "react-toastify";

const add_selectedChat = (payload) => {
  return {
    type: ADDCHATDATA,
    payload,
  };
};

const add_Chat = (payload) => {
  return {
    type: ADDCHAT,
    payload,
  };
};

const add_notification = (payload) => {
  return {
    type: ADDNOTIFICATION,
    payload,
  };
};
export const fetchChats = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const { data } = await axios.get(`${url}/api/v1/chat`, config);

    dispatch(add_Chat(data));
  } catch (error) {
    toast.error(error);
  }
};
export { add_Chat, add_selectedChat, add_notification };
