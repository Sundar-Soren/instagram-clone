const User = require("../models/userModel");

//Registration

exports.userRegistration = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        error: "User Already Exist",
      });
    }
    user = await User.create(req.body);

    const token = user.getJWTToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

//Login User

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please Enter Email and Password",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User Not Exist",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Password Not Match",
      });
    }

    const token = user.getJWTToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

//Logout User

exports.userLogout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};

//Get User Details

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      updateUser,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

//USER SUGGESTION

exports.getUserSuggestion = async (req, res) => {
  try {
    const getRandomUser = await User.aggregate([
      { $match: { username: { $not: { $eq: req.user.username } } } },
      { $sample: { size: 5 } },
    ]);
    res.status(200).json({
      getRandomUser,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
//FOLLOWING USER

exports.followingUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { following: req.body.following },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.body.following,
      {
        $addToSet: { follower: req.user.id },
      },
      { new: true }
    );
    return res.status(200).json({
      followingId: req.body.following,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
//UNFOLLOWING USER

exports.unFollowingUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          following: req.body.unfollowing,
        },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.body.unfollowing,
      {
        $pull: {
          follower: req.user.id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      unfollowingId: req.body.unfollowing,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

//PROFILE DETAILS BY USERNAME
exports.getProfileDetails = async (req, res) => {
  try {
    const profile = await User.findOne({ username: req.params.username });
    return res.status(200).json({
      profile,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

exports.getProfilePic = async (req, res) => {
  try {
    const profile = await User.findById(req.params.userId);
    res.status(200).json({
      profilePic: profile.avatar,
    });
  } catch (error) {
    res.status(500).json({
      error: "failed to fetch the proile pic",
    });
  }
};
