import React, { useState, useCallback } from "react";
import Image from "next/image";
import Bar from "../CLUI";
import {
  FaHome,
  FaUserCog,
  FaServer,
  FaHandshake,
  FaBlog,
  FaCogs,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import SidebarItem from "../SidebarItem";
import DropdownMenu from "./DropdownMenu";
import { useRouter } from "next/router";
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
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("user_id");
        Cookies.remove("token");
        window.location.href = "/login";
      } else {
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [baseURL]);

  const handleSidebarItemClick = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  const managementItems = [
    {
      text: "User Management",
      icon: <FaUserCog size={14} />,
      onClick: () => handleSidebarItemClick("/manage/user"),
    },
    {
      text: "Post Management",
      icon: <FaUserCog size={14} />,
      onClick: () => handleSidebarItemClick("/manage/post"),
    },
    {
      text: "Badge Management",
      icon: <FaUserCog size={14} />,
      onClick: () => handleSidebarItemClick("/manage/badge"),
    },
    {
      text: "Coterie Management",
      icon: <FaUserCog size={14} />,
      onClick: () => handleSidebarItemClick("/manage/coterie"),
    },
  ];

  const partnerItems = [
    {
      text: "New Partner",
      icon: <FaHandshake size={14} />,
      onClick: () => handleSidebarItemClick("/partner/new"),
    },
    {
      text: "Partner",
      icon: <FaHandshake size={14} />,
      onClick: () => handleSidebarItemClick("/partner"),
    },
  ];

  const blogItems = [
    {
      text: "New Blog",
      icon: <FaBlog size={14} />,
      onClick: () => handleSidebarItemClick("/blog/new"),
    },
    {
      text: "Blog",
      icon: <FaBlog size={14} />,
      onClick: () => handleSidebarItemClick("/blog"),
    },
  ];

  return (
    <>
      <div className="z-[3] fixed top-0 h-[80px] flex items-center w-full hidden lg:flex">
        <Bar />
      </div>

      <div className="z-[4] fixed top-2 right-4 lg:hidden">
        <FaBars
          size={30}
          color="white"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div
        className={`fixed top-0 left-0 h-screen lg:w-[270px] bg-opacity-80 z-[2] transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div className="h-[90px] flex items-center p-4 bg-opacity-80">
          <Image
            src="https://cdn.netsocial.app/images/png/netsocial-transparent.png"
            width={50}
            height={50}
            alt="NetSocial Logo"
            className="rounded-lg"
          />
          <p className="text-3xl font-bold text-white ml-3">NetSocial</p>
        </div>

        <div
          style={{
            height: "calc(100vh - 180px)",
            background: "rgb(255, 255, 255, 0.0)",
          }}
          className="w-full rounded-lg border-2 border-blue-800 p-2 overflow-y-auto"
        >
          <SidebarItem
            onClick={() => handleSidebarItemClick("/")}
            text={"Home"}
            icon={<FaHome />}
          />
          {isLoggedIn && (
            <>
              <DropdownMenu
                text="Management"
                icon={<FaUserCog size={18} />}
                items={managementItems}
              />
              <DropdownMenu
                text="Partner"
                icon={<FaHandshake size={18} />}
                items={partnerItems}
              />
              <DropdownMenu
                text="Blog"
                icon={<FaBlog size={18} />}
                items={blogItems}
              />
              <SidebarItem
                onClick={() =>
                  handleSidebarItemClick("https://status.netsocial.app")
                }
                text={"Status"}
                icon={<FaCogs />}
              />
              <div style={{ height: "250px" }} />
              <SidebarItem
                onClick={() =>
                  handleSidebarItemClick(
                    `https://netsocial.app/user/${username}`,
                  )
                }
                text={"Profile"}
                icon={
                  profilepicture ? (
                    <Image
                      src={profilepicture}
                      width={24}
                      height={24}
                      alt="Profile"
                      className="rounded-full"
                    />
                  ) : (
                    <FaUserCircle />
                  )
                }
              />
              <SidebarItem
                onClick={handleLogout}
                text={"Logout"}
                icon={<FaSignOutAlt />}
              />
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex flex-col items-center justify-center h-screen w-screen">
        <div
          style={{
            width: "calc(100vw - 300px)",
            height: "calc(100vh - 180px)",
            background: "rgb(255, 255, 255, 0.0)",
          }}
          className=" rounded-lg ml-[300px] border-2 border-blue-800 overflow-y-hidden overflow-x-hidden"
        >
          {children}
        </div>
      </div>

      <div className="lg:hidden flex flex-col h-screen w-full">
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 1px)",
          }}
          className="overflow-y-hidden"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
