export const getIconByStatus = status => {
  if (status == "Ugly") {
    return require("../../assets/images/icons/icon_error_red.png");
  } else if (status == "Bad") {
    return require("../../assets/images/icons/icon_error_yellow.png");
  } else if (status == "Good") {
    return require("../../assets/images/icons/icon_check.png");
  }
};

export const getIconByStatusForKeeper = status => {
  if (status == "notAccessed") {
    return require("../../assets/images/icons/icon_error_red.png");
  } else if (status == "accessed") {
    return require("../../assets/images/icons/icon_check.png");
  }
};
