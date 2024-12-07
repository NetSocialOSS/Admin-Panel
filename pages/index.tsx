'use client'

import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaHandshake, FaUsers } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { motion } from "framer-motion";

const StatCard = ({ icon, label, count }) => (
  <motion.div
    className="m-2 h-[100px] w-[220px] rounded-lg border border-blue-800 shadow-lg flex items-center px-4"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="h-[60px] w-[60px] rounded-full bg-white/10 flex items-center justify-center text-3xl text-white">
      {icon}
    </div>
    <div className="ml-4 flex flex-col">
      <p className="text-sm font-semibold text-blue-200">{label}</p>
      <p className="text-2xl font-bold text-white">{count.toLocaleString()}</p>
    </div>
  </motion.div>
);

const Announcement = ({ title, content }) => (
  <div className="flex items-center justify-between px-4 py-3 hover:bg-blue-800/20 border-b border-blue-800">
    <div>
      <p className="font-semibold text-lg text-white/80">{title}</p>
      <p className="text-white/60">{content}</p>
    </div>
  </div>
);


const baseURL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard: React.FC = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [partnersCount, setPartnersCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [coteriesCount, setCoteriesCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${baseURL}/stats/posts/@all`),
          fetch(`${baseURL}/stats/partners/@all`),
          fetch(`${baseURL}/stats/users/@all`),
          fetch(`${baseURL}/stats/coterie/@all`),
        ]);

        const data = await Promise.all(responses.map((res) => res.json()));

        setPostsCount(data[0].total_posts);
        setPartnersCount(data[1].total_partners);
        setUsersCount(data[2].total_registered_user);
        setCoteriesCount(data[3].total_coteries);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard Overview</h1>
            
      <div className="flex flex-wrap justify-center items-center">
        <h2 className="text-3xl font-bold text-center">Stats</h2>
        <StatCard
          icon={<FaHandshake />}
          label="Partners"
          count={partnersCount}
        />
        <StatCard 
          icon={<FaCheckCircle />} 
          label="Posts" 
          count={postsCount} 
        />
        <StatCard 
          icon={<FaUsers />} 
          label="Users" 
          count={usersCount} 
        />
        <StatCard
          icon={<AiOutlineUsergroupAdd />}
          label="Coteries"
          count={coteriesCount}
        />
      </div>

      <div className="w-full flex items-center flex-col px-4 py-2 mt-4">
          <div className="w-full overflow-hidden rounded-lg bg-blue-800/10">
            <p className="py-4 px-4 bg-blue-800/10 font-semibold text-lg text-center">
              Today&apos;s announcements
            </p>
            <div className="h-[200px] py-2 overflow-auto">
              <Announcement
                title="Partners Update"
                content="All the partner will be managed from the Admin Panel."
              />
              <Announcement
                title="First Announcement"
                content="Test"
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;

