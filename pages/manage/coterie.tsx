import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string;
}

const CoterieManagement: React.FC<Props> = ({ userId }) => {
  const [coterieId, setCoterieId] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleDeleteCoterie = async () => {
    if (!coterieId) {
      toast.error("Coterie ID is required.");
      return;
    }
    const response = await fetch(
      `${baseURL}/admin/manage/coterie?name=${coterieId}&modid=${userId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      toast.success(`Coterie with ID ${coterieId} deleted successfully.`);
      setCoterieId(""); // Clear the input field after successful deletion
    } else {
      toast.error(`Failed to delete coterie with ID ${coterieId}.`);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Coterie Management</h1>
      <div className="p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="coterieId" className="block font-medium mb-2">
            Coterie Name
          </label>
          <div className="border border-blue-800 rounded-lg">
            <input
              type="text"
              id="coterieId"
              placeholder="Enter the Coterie name to delete..."
              className={`w-full px-4 py-2 border text-white border-blue-800 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={coterieId}
              onChange={(e) => setCoterieId(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDeleteCoterie}
          >
            Delete Coterie
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CoterieManagement;
