import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "../components/Static/Navbar";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profilepicture, setProfilePicture] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseURL}/auth/@me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUsername(data.username);
          setProfilePicture(`${baseURL}/profile/${data.username}/image`);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, [baseURL]);

  return (
    <>
      <NextNProgress options={{ showSpinner: false }} />
      <Head>
        <title>NetSocial - Administrative Panel</title>
        <link
          rel="icon"
          href="https://cdn.netsocial.app/images/png/netsocial-transparent.png"
        />
      </Head>
      <Navbar isLoggedIn={isLoggedIn} profilepicture={profilepicture} username={username}>
        <div className="h-full w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              transition={{ type: "linear", duration: 0.3 }}
              className="h-full w-full overflow-auto"
              key={router.pathname}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
            >
              <Component
                {...pageProps}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Navbar>
    </>
  );
}

export default MyApp;
