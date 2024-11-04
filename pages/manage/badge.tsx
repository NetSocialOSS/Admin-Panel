import { useState, useEffect } from "react";
import { FaCode, FaCrown, FaHandshake, FaUserShield } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string;
}

const BadgeManagement: React.FC<Props> = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [selectedAction, setSelectedAction] = useState("add");
  const [availableBadges, setAvailableBadges] = useState([
    { name: "Developer", icon: FaCode, value: "dev" },
    { name: "Owner", icon: FaCrown, value: "owner" },
    { name: "Partner", icon: FaHandshake, value: "partner" },
    { name: "Moderator", icon: FaUserShield, value: "moderator" },
    { name: "Verified", icon: MdVerified, value: "verified" },
  ]);
  const [appliedBadges, setAppliedBadges] = useState([]);// Initialize state for user_id

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleBadgeApply = (badge) => {
    if (!appliedBadges.some((b) => b.value === badge.value)) {
      setAppliedBadges([...appliedBadges, badge]);
    } else {
      console.log(`Badge ${badge.name} is already applied.`);
    }
  };

  const handleBadgeRemove = (badge) => {
    setAppliedBadges(appliedBadges.filter((b) => b.value !== badge.value));
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }
    for (let badge of appliedBadges) {
      const response = await fetch(
        `${baseURL}/admin/manage/badge?username=${username}&action=${selectedAction}&badge=${badge.value}&modid=${userId}`,
        {
          method: "POST",
        }
      );
  
      if (response.ok) {
        toast.success(`${badge.name} badge ${selectedAction}ed successfully.`);
      } else {
        toast.error(` Failed to ${selectedAction} ${badge.name} badge.`);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Badge Management</h1>
      <div className="p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="username" className="block font-medium mb-2">
            User Name
          </label>
          <div className="relative border border-blue-800 rounded">
  {username && (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <img
        src={`${baseURL}/profile/${username}/image`}
        alt="User"
        className="w-10 h-10 rounded-full"
      />
    </div>
  )}
  <input
    type="text"
    id="username"
    placeholder="Enter the username..."
    className={`w-full px-4 py-2 border text-white border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${username ? 'pl-14' : 'pl-4'}`}
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
        </div>
        <div className="mb-6">
          <label htmlFor="action" className="block font-medium mb-2">
            Select Action
          </label>
          <select
            id="action"
            className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="badges" className="block font-medium mb-2">
            Available Badges
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableBadges.map((badge, index) => (
              <div
                key={index}
                className="bg-black p-4 rounded-md flex items-center justify-between cursor-pointer border border-blue-800"
                onClick={() => handleBadgeApply(badge)}
              >
                <div className="flex items-center">
                  <badge.icon className="text-blue-500 mr-2" />
                  <span>{badge.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="applied-badges" className="block font-medium mb-2">
            Applied Badges
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {appliedBadges.map((badge, index) => (
              <div
                key={index}
                className="text-white p-4 rounded-md flex items-center justify-between border border-blue-800"
              >
                <div className="flex items-center">
                  <badge.icon className="text-blue-500 mr-2" />
                  <span className="mr-1">{badge.name}</span>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => handleBadgeRemove(badge)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default BadgeManagement;