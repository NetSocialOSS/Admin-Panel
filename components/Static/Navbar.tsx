import React, { useState, useCallback } from "react";
import Image from "next/image";
import Bar from "../CLUI";
import {
  FaHome,
  FaRobot,
  FaServer,
  FaHandshake,
  FaUser,
  FaCogs,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import SidebarItem from "../SidebarItem";
import { useRouter } from "next/router";
import DropDown from "../other/dropdown";
import Cookies from "js-cookie";

interface NavbarProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  profilepicture: string;
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({
  children,
  isLoggedIn,
  profilepicture,
  username,
}) => {
  const router = useRouter();
  const [showBotsDropdown, setBotsDropdown] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // Function to handle logout
  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Logout successful
        localStorage.removeItem("user_id");
        Cookies.remove("token"); // Remove the token cookie
        window.location.href = "/login";
      } else {
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle the error if needed
    }
  }, [baseURL]);

  return (
    <>
      <div className="z-[3] fixed top-0 h-[80px] flex items-center">
        <Bar />
      </div>
      <div className="flex flex-col items-center h-screen w-[270px] fixed top-0 left-[20px] z-[2]">
        <div className="h-[90px] flex items-center">
          <Image
            src="https://cdn.netsocial.app/images/png/netsocial-transparent.png"
            width={50}
            height={50}
            alt="Neso Logo"
            className="rounded-lg"
          />
          <p className="text-3xl font-bold text-white ml-3">NetSocial</p>
        </div>
        <div
          style={{
            height: "calc(100vh - 180px)",
            background: "rgb(255, 255, 255, 0.0)",
          }}
          className="w-[250px] flex flex-col rounded-lg border-2 border-blue-800 p-4 pt-[50px]"
        >
          <SidebarItem onClick={() => router.push("/")} text={"Home"} icon={<FaHome />} />
          <SidebarItem onClick={() => router.push("/servers")} text={"Servers"} icon={<FaServer />} />
          <SidebarItem onClick={() => router.push("/user/management")} text={"User Management"} icon={<FaUser />} />
          <SidebarItem onClick={() => router.push("/partner")} text={"Partners"} icon={<FaHandshake />} />
          <SidebarItem onClick={() => router.push("https://status.netsocial.app")} text={"Status"} icon={<FaCogs />} />
          <SidebarItem onClick={() => router.push("/analytics")} text={"Analytics"} icon={<SiSimpleanalytics  />} />
          <div style={{ height: "90px" }} />
          {isLoggedIn && (
            <>
              <SidebarItem
                onClick={() => router.push(`https://netsocial.app/user/${username}`)}
                text={"Profile"}
                icon={
                  profilepicture ? (
                    <Image src={profilepicture} width={24} height={24} alt="Profile" className="rounded-full" />
                  ) : (
                    <FaUserCircle />
                  )
                }
              />
              <SidebarItem onClick={handleLogout} text={"Logout"} icon={<FaSignOutAlt />} />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div
          style={{
            width: "calc(100vw - 300px)",
            height: "calc(100vh - 180px)",
            background: "rgb(255, 255, 255, 0.0)",
          }}
          className="rounded-lg ml-[300px] border-2 border-blue-800 overflow-y-hidden overflow-x-hidden"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
