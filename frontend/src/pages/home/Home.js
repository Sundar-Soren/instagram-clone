import React from "react";
import HomeFeed from "../../components/feed/home-feed/HomeFeed";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <HomeFeed />
      </div>
    </>
  );
};

export default Home;
