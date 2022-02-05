import React, { useEffect } from "react";
import ProfileComp from "../../FUC/ProfileComp";
import SingleMainComp from "./HF-components/SingleMainComp";
import "./homeFeed.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserSuggestion } from "../../../context/actions/userActions";
const HomeFeed = () => {
  const dispatch = useDispatch();
  const { suggestionUser } = useSelector((state) => state.userSuggestion);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserSuggestion());
  }, [dispatch]);
  return (
    <div className="homeFeed">
      <div className="homeFeed_left">
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
        <SingleMainComp />
      </div>
      <div className="homeFeed_right">
        <div className="homeFeed_right_container">
          <h4>Suggestions For You</h4>
          {suggestionUser &&
            user &&
            suggestionUser.map((users, i) => (
              <div className="homeFeed_right_sug" key={i}>
                <ProfileComp
                  follow={true}
                  users={users}
                  followingUser={user.following}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
