import User from "../models/User.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUserId = req.user.userid;
    //  yaane bjeb klshy users mn 3da al user yali loggedIn
    const allUsers = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
