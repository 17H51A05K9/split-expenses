"use client"
import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import { benefitOne, benefitTwo } from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import { useEffect, useState } from "react";

const Home = () => {
  
  // useEffect(() => {
  //   if(globalThis.window.localStorage.getItem("userid")){
  //     console.log(1);
  //   }
  // },[])
    return (
      <>
        <Head>
          <title>Split-Expenses</title>
          <meta
            name="description"
            content="Split Expenses app is used for sharing the expenses with our friends."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
     <div className="bg-[url('https://t3.ftcdn.net/jpg/03/91/46/10/360_F_391461057_5P0BOWl4lY442Zoo9rzEeJU0S2c1WDZR.jpg')]">
        <Navbar />
        <Hero />
        <SectionTitle
          pretitle="Split Expenses Benefits"
          title=" Why should you use this Split Expenses">
          Split-Expenses app is used for calculating your group expenses and also you can use the cash book.
        </SectionTitle>
        {/* <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} /> */}
        {/* <SectionTitle
          pretitle="Watch a video"
          title="Learn how to fullfil your needs">
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate. So,
          don&apos;t forget to add one. Just like this.
        </SectionTitle> */}
        {/* <Video />
        <SectionTitle
          pretitle="Testimonials"
          title="Here's what our customers said">
          Testimonails is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle> */}
        {/* <Testimonials />
        <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>
        <Faq />
        <Cta /> */}
        <Footer />
        <PopupWidget />
        </div>
      </>
    );
  
}

export default Home;