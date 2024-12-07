import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaCrown,
  FaUserCog,
  FaCode,
  FaShieldAlt,
  FaUserSecret,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Tooltip } from "../components/layout/Tooltip";

interface UserProfile {
  username: string;
  shortBio: string;
  image: string;
  isDeveloper: boolean;
  isOwner: boolean;
  isQAQC: boolean;
  isDODP: boolean;
  isModerator: boolean;
}

const Team: React.FC = () => {
  const profiles: UserProfile[] = [
    {
      username: "john_doe",
      shortBio: "Lead Developer",
      image: "/images/john_doe.jpg",
      isDeveloper: true,
      isOwner: true,
      isQAQC: true,
      isDODP: true,
      isModerator: true,
    },
  ];

  const getBadgeIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <FaCrown />;
      case "Developer":
        return <FaCode />;
      case "QAQC":
        return <FaUserCog />;
      case "DODP":
        return <FaUserSecret />;
      case "Moderator":
        return <FaShieldAlt />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col py-2">
      {profiles.map((profile, index) => (
        <motion.div
          key={index}
          className="flex items-center bg-blue-900/10 p-4 rounded-lg mb-6 relative shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="relative w-32 h-32">
            <Image
              src={profile.image}
              className="rounded-lg object-cover"
              layout="fill"
              alt="Profile Picture"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-bold text-3xl text-white">{profile.username}</p>
            <p className="font-semibold text-lg text-white/70">{profile.shortBio}</p>
          </div>
          <motion.button
            className="absolute top-2 right-2 text-white bg-blue-500 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(`/user/${profile.username}`, "_blank")}
          >
            <FaExternalLinkAlt />
          </motion.button>
          <div className="absolute bottom-2 left-2 flex space-x-3 z-10">
            {profile.isOwner && (
              <Tooltip content="Owner">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-yellow-500"
                >
                  {getBadgeIcon("Owner")}
                </motion.div>
              </Tooltip>
            )}
            {profile.isDeveloper && (
              <Tooltip content="Developer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-500"
                >
                  {getBadgeIcon("Developer")}
                </motion.div>
              </Tooltip>
            )}
            {profile.isQAQC && (
              <Tooltip content="QAQC">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-green-500"
                >
                  {getBadgeIcon("QAQC")}
                </motion.div>
              </Tooltip>
            )}
            {profile.isDODP && (
              <Tooltip content="DODP">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-500"
                >
                  {getBadgeIcon("DODP")}
                </motion.div>
              </Tooltip>
            )}
            {profile.isModerator && (
              <Tooltip content="Moderator">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-red-500"
                >
                  {getBadgeIcon("Moderator")}
                </motion.div>
              </Tooltip>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Team;