import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string;
}

const PostManagement: React.FC<Props> = ({ userId }) => {
  const [postId, setPostId] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleDeletePost = async () => {
    if (!postId) {
      toast.error("Post ID is required.");
      return;
    }
    const response = await fetch(`${baseURL}/admin/manage/post?postId=${postId}&modid=${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success(`Post with ID ${postId} deleted successfully.`);
      setPostId(""); // Clear the input field after successful deletion
    } else {
      toast.error(`Failed to delete post with ID ${postId}.`);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Post Management</h1>
      <div className="p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="postId" className="block font-medium mb-2">
            Post ID
          </label>
          <div className="border border-blue-800 rounded rounded-lg">
          <input
            type="text"
            id="postId"
            placeholder="Enter the Post ID to delete..."
            className={`w-full px-4 py-2 border text-white border-blue-800 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          </div>
        </div>
        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PostManagement;
