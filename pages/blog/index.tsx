import BlogCard from "../../components/layout/cards/blogs"
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  authorname: string;
  authoravatar: string;
}

export default function Partners() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/@all`,
        );
        const data: BlogPost[] = await response.json();
        const sortedPosts = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setPosts(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="w-full my-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="mt-16 text-4xl font-bold leading-tight tracking-tight text-cyber-cyan sm:text-5xl">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent text-7xl text-center">
                Blogs
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neon-blue lg:mx-auto">
              <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text ">
                We value our partners at NetSocial and appreciate their support.
              </span>
            </p>
            <div className="mb-14" />
          </div>
        </div>
        {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-black shadow rounded-lg p-6 animate-pulse"
                    >
                      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))
                : posts.map(
                    ({ slug, date, title, authorname, authoravatar }) => (
                      <BlogCard
                        key={uuidv4()}
                        slug={slug}
                        date={date}
                        title={title}
                        authorname={authorname}
                        authoravatar={authoravatar}
                      />
                    ),
                  )}
      </div>
    </>
  );
}