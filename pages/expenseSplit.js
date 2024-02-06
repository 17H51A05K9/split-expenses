import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import Split from "../components/split";


export default function(){
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
        <Split/>
        <Footer />
        <PopupWidget />
        </div>
        </>
    )
}