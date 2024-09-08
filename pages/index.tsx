import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaHandshake, FaUserCog, FaUsers } from "react-icons/fa";
import { AiOutlineRobot, AiOutlineUsergroupAdd } from "react-icons/ai";

const StatCard = ({ icon, label, count }) => (
  <div className="mx-2 h-[80px] w-[200px] rounded-lg bg-blue-800/10 flex items-center px-3">
    <div className="h-[50px] w-[50px] rounded-lg bg-blue-800/20 flex items-center justify-center text-2xl">
      {icon}
    </div>
    <div className="ml-3 flex flex-col">
      <p className="text-sm font-semibold text-white/50">{label}</p>
      <p className="text-lg font-semibold text-white">{count}</p>
    </div>
  </div>
);

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const App: React.FC = () => {
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
        setPartnersCount(data[1].total_partner);
        setUsersCount(data[2].total_registered_user);
        setCoteriesCount(data[3].total_coteries);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col md:flex-row items-center justify-center p-3">
          <div className="text-center">Stats</div>
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
      </div>
    </>
  );
};

export default App;
