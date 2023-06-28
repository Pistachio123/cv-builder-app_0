/** @format */

const fileReducer = (file = "../../../public/profile.jpg", action) => {
  switch (action.type) {
    case "MANAGE_FILE":
      return action.payload;
    default:
      return file;
  }
};
export default fileReducer;
