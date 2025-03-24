import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import MyState from "../../context/myState";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  const context = useContext(myContext);
  // const { loading, setLoading } = context;

  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
      <Loader />
    </Layout>
  );
};

export default HomePage;
