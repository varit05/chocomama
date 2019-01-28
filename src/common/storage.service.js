const USER_DETAILS = "setCurrentUser";

export const getUserDetails = () => {
  return window.localStorage.getItem(USER_DETAILS);
};

export const saveUserDetails = details => {
  window.localStorage.setItem(USER_DETAILS, details);
};

export const removeUserDetails = () => {
  window.localStorage.removeItem(USER_DETAILS);
};

export default { getUserDetails, saveUserDetails, removeUserDetails };
