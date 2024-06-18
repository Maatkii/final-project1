import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { successToast, url } from "../../utils";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { add_Chat, add_notification } from "../../redux/actions/chatActions";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
let socket, selectedChatCompare;

const MessageContent = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState(undefined);
  const { user } = useSelector((state) => state.LoginReducer);

  const { selectedChat, notification } = useSelector(
    (state) => state.ChatReducer
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await axios.get(
        `${url}/api/v1/chat/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchChats = async () => {
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
  // useEffect(() => {
  //   if (notification.length > 0) {
  //     successToast(`new Message from ${notification[0].sender.firstName}`);
  //   }
  // }, [notification]);

  const sendMessage = async (e) => {
    if ((e.key === "Enter" && newMessage) || (e == "click" && newMessage)) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const config = {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        };
        const { data } = await axios.post(
          `${url}/api/v1/chat/send-message`,
          {
            message: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        socket.emit("new-message", data);
        fetchChats();
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", user);

    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          dispatch(add_notification([newMessageReceived, ...notification]));
          setFetchAgain((prev) => !prev); // Toggle fetchAgain
        }
      } else {
        fetchChats();
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on("message-received", handleMessageReceived);

    return () => {
      // Clean up the socket listener when component unmounts
      socket.off("message-received", handleMessageReceived);
    };
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id
      ? { firstName: users[1].firstName, lastName: users[1].lastName }
      : { firstName: users[0].firstName, lastName: users[0].lastName };
  };
  return (
    <div className="message-content">
      <div className="messages-headline">
        {selectedChat ? (
          <>
            <h4>{`${getSender(user, selectedChat?.users).firstName} ${
              getSender(user, selectedChat?.users).lastName
            } `}</h4>
            <a href="#" className="message-action">
              <i className="fa-regular fa-trash-alt" /> Delete Conversation
            </a>
          </>
        ) : null}
      </div>
      {/* Message Content Inner */}
      {selectedChat ? (
        <>
          <div className="message-content-inner">
            {/* Time Sign */}
            {/* <div className="message-time-sign">
          <span>28 June, 2019</span>
        </div> */}
            {loading && messages == undefined ? (
              <ClipLoader color="#ddd" size={20} />
            ) : (
              <>
                {messages.map((message, index) => {
                  return (
                    <div
                      ref={messagesEndRef}
                      className={`message-bubble ${
                        message.sender._id == user._id ? "me" : ""
                      }`}
                      key={index}
                    >
                      <div className="message-bubble-inner">
                        <div className="message-avatar">
                          <img src={message.sender.avatar} alt="" />
                        </div>
                        <div className="message-text">
                          <p>{message.message}</p>
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                  );
                })}
                {isTyping ? (
                  <div className="message-text">
                    <div className="typing-indicator">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
          {/* Reply Area */}
          <div className="message-reply">
            <textarea
              cols={1}
              rows={1}
              placeholder="Your Message"
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
            />
            <button
              className="button ripple-effect"
              onClick={() => sendMessage("click")}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="message-content-inner" style={{ height: "70vh" }}>
          <p>Select Chat to Start Conversation</p>
        </div>
      )}
      {/* Message Content Inner / End */}
    </div>
  );
};

export default MessageContent;
