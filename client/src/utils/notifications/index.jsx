import React from "react";
import { notification } from "antd";

import okayIcon from "../../assets/images/okay.png";
import errorIcon from "../../assets/images/error.png";

const openNotification = (message, description, isErrors) => {
  notification.open({
    message: message,
    description: description,
    icon: (
      <img
        style={{ marginTop: 10, width: 30 }}
        src={isErrors ? errorIcon : okayIcon}
        alt="icon"
      />
    ),
  });
};

export default openNotification;
