"use client";

import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string;
}

export default function AddPartner({ userId }: Props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [services, setServices] = useState([{ name: "" }]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${baseURL}/partner/new?name=${encodeURIComponent(name)}&link=${encodeURIComponent(link)}&logo=${encodeURIComponent(logo)}&banner=${encodeURIComponent(banner)}&description=${encodeURIComponent(description)}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-userId": userId || "",
        },
      });

      if (response.ok) {
        toast.success("Partner added successfully!");
        setName("");
        setLink("");
        setDescription("");
        setLogo("");
        setBanner("");
        setServices([{ name: "" }]);
      } else {
        throw new Error("Failed to add partner");
      }
    } catch (error) {
      toast.error("There was an error adding the partner. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg border border-blue-800 text-white shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Add New Partner
          </h2>

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Partner Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="link" className="block text-sm font-medium mb-2">
              Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="logo" className="block text-sm font-medium mb-2">
              Logo URL
            </label>
            <input
              type="url"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="banner" className="block text-sm font-medium mb-2">
              Banner URL
            </label>
            <input
              type="url"
              id="banner"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
          >
            <FaHandshake className="mr-2" /> Add Partner
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
