import React from "react";
import Header from "../../components/Header";
import TopHalf from "../../components/TopHalf/TopHalf";
import BottomHalf from "../../components/BottomHalf/BottomHalf";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-bg-color ">
      <Header />
      <TopHalf />
      <BottomHalf/>
    </div>
  );
};

export default Home;
