import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const LoginPromptModal: React.FC = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="p-12 rounded-lg shadow-lg text-center  border border-blue-600"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Please Log In
        </h2>
        <p className="mb-8 text-white">
          You need to be logged in to access this content.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Go to Login
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LoginPromptModal;
