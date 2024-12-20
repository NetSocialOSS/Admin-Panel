import { useState, useEffect } from "react";
import { FaCode, FaCrown, FaHandshake, FaUserShield } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string;
}

const BadgeManagement: React.FC<Props> = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState("add");
  const [entityType, setentityType] = useState("user");
  const [availableBadges, setAvailableBadges] = useState([
    { name: "Developer", icon: FaCode, value: "dev" },
    { name: "Owner", icon: FaCrown, value: "owner" },
    { name: "Partner", icon: FaHandshake, value: "partner" },
    { name: "Moderator", icon: FaUserShield, value: "moderator" },
    { name: "Verified", icon: MdVerified, value: "verified" },
  ]);
  const [appliedBadges, setAppliedBadges] = useState([]);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (entityType === "coterie") {
      setAvailableBadges([
        { name: "Organization", icon: FaHandshake, value: "organisation" },
        { name: "Verified", icon: MdVerified, value: "verified" },
      ]);
    } else {
      setAvailableBadges([
        { name: "Developer", icon: FaCode, value: "dev" },
        { name: "Owner", icon: FaCrown, value: "owner" },
        { name: "Partner", icon: FaHandshake, value: "partner" },
        { name: "Moderator", icon: FaUserShield, value: "moderator" },
        { name: "Verified", icon: MdVerified, value: "verified" },
      ]);
    }
    setAppliedBadges([]);
  }, [entityType]);

  // Fetch profile picture for User role
  const fetchProfilePicture = async (username: string) => {
    if (!username || entityType !== "user") return;

    try {
      const response = await fetch(`${baseURL}/user/${username}?action=info`);
      const data = await response.json();
      if (response.ok && data.profilePicture) {
        setProfilePicture(data.profilePicture);
      } else {
        toast.error("Failed to fetch profile picture.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the profile picture.");
    }
  };

  // Fetch profile picture only on submit
  const handleSubmit = async () => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    if (entityType === "user" && username) {
      await fetchProfilePicture(username); // Fetch only when submit is clicked
    }

    let success = true;
    for (let badge of appliedBadges) {
      const response = await fetch(`${baseURL}/admin/manage/badge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-username": username,
          "X-action": selectedAction,
          "X-modid": userId,
          "X-badge": badge.value,
          "X-entity": entityType,
        },
      });

      if (response.ok) {
        // Custom success toast message
        toast.success(
          `The ${badge.name} badge has been ${selectedAction}ed successfully to the ${entityType}.`,
          {
            icon: "😊",
            style: {
              borderRadius: "5px",
              background: "var(--primary-color)", // Make sure this CSS variable exists
              color: "#ffffff",
            },
          },
        );
      } else {
        toast.error(`Failed to ${selectedAction} the ${badge.name} badge.`);
        success = false;
      }
    }

    if (success) {
      setAppliedBadges([]); // Reset applied badges on success
    }
  };

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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Badge Management</h1>
      <div className="p-6 rounded-lg shadow-md">
        {/* Role Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="entityType" className="block font-medium mb-2">
            Entity Type
          </label>
          <select
            id="entityType"
            className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={entityType}
            onChange={(e) => setentityType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="coterie">Coterie</option>
          </select>
        </div>

        {/* Add/Remove Dropdown */}
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

        {/* Username or Coterie Name */}
        <div className="mb-6">
          <label htmlFor="username" className="block font-medium mb-2">
            {entityType === "user" ? "User Name" : "Coterie Name"}
          </label>
          <div className="relative border border-blue-800 rounded">
            {profilePicture && entityType === "user" && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src={profilePicture}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            )}
            <input
              type="text"
              id="username"
              placeholder={`Enter the ${entityType.toLowerCase()} name...`}
              className={`w-full px-4 py-2 border text-white border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${profilePicture && entityType === "user" ? "pl-14" : "pl-4"}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Available Badges */}
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

        {/* Applied Badges */}
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
          {/* Display applied badges as comma-separated */}
          <div className="mt-2">
            <strong>Applied Badges:</strong>{" "}
            {appliedBadges.map((b) => b.name).join(", ")}
          </div>
        </div>

        {/* Submit Button */}
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
};

export default BadgeManagement;
