import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "../components/Static/Navbar";
import Head from "next/head";
import LoginPromptModal from "../components/layout/LoginPromptModal";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [userid, setUserID] = useState<string>("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const AES_KEY = process.env.NEXT_PUBLIC_AES_KEY;

 //encrypter encrypts
 const encrypter = async (password: string): Promise<string> => {
  try {
    if (!AES_KEY) {
      console.error("AES_KEY is not defined in environment variables.");
      throw new Error("Encryption key missing.");
    }

    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(AES_KEY), // Use raw key (already a 256-bit key)
      { name: "AES-GCM" },
      false,
      ["encrypt"],
    );

    const nonce = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the password using AES-GCM
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: nonce },
      keyMaterial,
      encoder.encode(password),
    );

    // Convert both nonce and encrypted data to Base64
    const encryptedBase64 = btoa(
      String.fromCharCode(...Array.from(new Uint8Array(encrypted))),
    );
    const nonceBase64 = btoa(String.fromCharCode(...Array.from(nonce)));

    // Return both the nonce and the encrypted password, separated by a colon (ESSENTIAL FOR HARBINGER)
    return `${nonceBase64}:${encryptedBase64}`;
  } catch (error) {
    console.error("Password encryption failed:", error);
    throw new Error("Encryption failed.");
  }
};

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
          const encryptedId = await encrypter(data._id);
          setUserID(encryptedId);
          setProfilePicture(data.profilePicture);
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
      <Navbar
        isLoggedIn={isLoggedIn}
        profilepicture={profilepicture}
        username={username}
      >
        <div className="h-full w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              transition={{ type: "linear", duration: 0.3 }}
              className="h-full w-full overflow-auto"
              key={router.pathname}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
            >
              {!isLoggedIn && <LoginPromptModal />}
              <Component
                {...pageProps}
                isLoggedIn={isLoggedIn}
                username={username}
                userId={userid}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Navbar>
    </>
  );
}

export default MyApp;
