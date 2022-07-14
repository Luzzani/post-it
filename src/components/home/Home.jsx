import React from "react";
import AddTask from "../AddTask/AddTask";
import "./Home.css";

function Home() {
  return (
    <section className="container">
      <h1 className="home__title">Post It Simulator!</h1>
      <AddTask />
    </section>
  );
}

export default Home;
