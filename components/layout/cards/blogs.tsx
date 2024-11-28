import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  slug: string;
  date: string;
  title: string;
  authoravatar: string;
  authorname: string;
}

const BlogCard: React.FC<Props> = ({
  slug,
  date,
  title,
  authoravatar,
  authorname,
}) => {
  return (
      <div className="relative overflow-hidden rounded-xl border border-blue-800 hover:border-border-blue-800 hover:shadow-primary border-border-blue-800 bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        <div className="relative z-10">
          <h2 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 ease-in-out group-hover:text-primary">
            {title}
          </h2>
          <div className="mb-6 flex items-center space-x-4">
            <div className="group flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary/50 transition-all duration-300 ease-in-out group-hover:ring-primary">
                <Image
                  src={authoravatar}
                  layout="fill"
                  objectFit="cover"
                  alt={`${authorname} Avatar`}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-medium text-gray-300 transition-colors duration-300 ease-in-out group-hover:text-primary">
                {authorname}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FaCalendarAlt className="text-primary" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-primary-light to-primary"
          style={{
            transform: "translateX(-100%)",
            animation: "slide 2s ease-in-out infinite",
          }}
        />
      </div>
  );
};

export default BlogCard;
