import React from "react";
import ProfileComp from "../../FUC/ProfileComp";
import SingleMainComp from "./HF-components/SingleMainComp";
import "./homeFeed.scss";
const HomeFeed = () => {
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
          <div className="homeFeed_right_sug">
            <ProfileComp follow={true} />
          </div>
          <div className="homeFeed_right_sug">
            <ProfileComp follow={true} />
          </div>
          <div className="homeFeed_right_sug">
            <ProfileComp follow={true} />
          </div>
          <div className="homeFeed_right_sug">
            <ProfileComp follow={true} />
          </div>
          <div className="homeFeed_right_sug">
            <ProfileComp follow={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
