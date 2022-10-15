import React from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
const Home = () => {
  const currentUser = useSelector((state: any) => state.currentUser);

  return (
    <div className="home">
      <div className="container">
        <Sidebar currentUser={currentUser} />
        <Chat {...currentUser} />
      </div>
    </div>
  );
};

export default Home;
