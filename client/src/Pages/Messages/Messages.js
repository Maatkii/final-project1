import React, { useState } from "react";
import MessageSideBar from "./MessageSideBar";
import MessageContent from "./MessageContent";

const Messages = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="dashboard-content-container">
      <div className="dashboard-content-inner" style={{ minHeight: 281 }}>
        {/* Dashboard Headline */}
        <div className="dashboard-headline">
          <h3>Messages</h3>
          {/* Breadcrumbs */}
        </div>
        <div className="messages-container margin-top-0 margin-bottom-40">
          <div className="messages-container-inner">
            <MessageSideBar fetchAgain={fetchAgain} />
            {/* Message Content */}
            <MessageContent
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
            {/* Message Content */}
          </div>
        </div>
        {/* Messages Container / End */}
      </div>
    </div>
  );
};

export default Messages;
