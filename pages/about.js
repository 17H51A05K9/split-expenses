import About from "../components/aboutcomp";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import MyExpenses  from "../components/expenses";

export default function AboutPage() {
    return(
        <>
        <>
        <Head>
          <title>Split-Expenses</title>
          <meta
            name="description"
            content="Split Expenses app is used for sharing the expenses with our friends."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <About/>
        <Footer />
        <PopupWidget />
        </>
        </>
    );
}