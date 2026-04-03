import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Restaurants from "../components/Restaurants";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <Categories />
      <Restaurants />
      <Footer />
    </>
  );
}

export default Home;
