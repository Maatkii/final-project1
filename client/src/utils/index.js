import { toast } from "react-toastify";
import axios from "axios";
export const url = "http://localhost:5000";

export const errorToast = (err) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const successToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const scrollToElement = (elementId) => {
  if (elementId) {
    const element = window.location.pathname;
    if (element.includes(elementId)) {
      setTimeout(() => {
        const anchorTag = document.getElementById(elementId);
        if (anchorTag) {
          anchorTag.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 3000);
    }
  }
};
export const dateFunction = (date) => {
  const dateValue = new Date(date);
  if (dateValue.getDate() < 10) {
    var day = `0${dateValue.getDate()}`;
  } else {
    day = dateValue.getDate();
  }
  if (dateValue.getMonth() + 1 < 10) {
    var month = `0${dateValue.getMonth() + 1}`;
  } else {
    month = `${dateValue.getMonth() + 1}`;
  }
  const year = dateValue.getFullYear();

  return `${year}-${month}-${day}`;
};

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzcf29ead/upload",
      data
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;

export const calculateTimeSince = (date) => {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id
    ? { firstName: users[1].firstName, lastName: users[1].lastName }
    : { firstName: users[0].firstName, lastName: users[0].lastName };
};
