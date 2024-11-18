import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string; // The ID of the user performing the management
}

const UserManagement: React.FC<Props> = ({ userId }) => {
  const [userIdToManage, setUserIdToManage] = useState("");
  const [selectedAction, setSelectedAction] = useState("ban");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleManageUser = async () => {
    if (!userIdToManage) {
      toast.error("User ID is required.");
      return;
    }

    const response = await fetch(
      `${baseURL}/admin/manage/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            "X-username": userIdToManage,
            "X-action": selectedAction,
            "X-modid": userId,
        }
      },
    );

    if (response.ok) {
      toast.success(
        `User with ID ${userIdToManage} has been ${selectedAction}ed successfully.`,
      );
      setUserIdToManage("");
      setSelectedAction("ban");
    } else {
      toast.error(
        `Failed to ${selectedAction} user with ID ${userIdToManage}.`,
      );
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="userIdToManage" className="block font-medium mb-2">
            Username
          </label>
          <div className="border border-blue-800 rounded-lg">
            <input
              type="text"
              id="userIdToManage"
              placeholder="Enter the User's name to ban/unban..."
              className={`w-full px-4 py-2 border text-white border-blue-800 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={userIdToManage}
              onChange={(e) => setUserIdToManage(e.target.value)}
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
            <option value="ban">Ban</option>
            <option value="unban">Unban</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleManageUser}
          >
            {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)}{" "}
            User
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserManagement;
