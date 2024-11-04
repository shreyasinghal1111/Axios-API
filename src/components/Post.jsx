import { useEffect, useState } from "react";
import { getPost } from "../api/PostAPI";
import { FaStar } from "react-icons/fa";
import { GoIssueClosed } from "react-icons/go";
import { BiTime } from "react-icons/bi";

const Post = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data.items);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-pulse">
          GitHub Repositories
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((repo) => {
            return (
              <li
                key={repo.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login}'s avatar`}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-1">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      #{repo.name}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2">
                      {repo.name}
                    </h3>
                    <p className="text-gray-600">{repo.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-5 h-5" />
                        <span className="ml-1 text-gray-700">
                          {repo.stargazers_count}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <GoIssueClosed className="text-green-600 w-5 h-5" />
                        <span className="ml-1 text-gray-700">
                          Issue Count :{repo.open_issues_count}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BiTime className="w-4 h-4 mr-1" />
                        <span>Created: {formatDate(repo.created_at)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <BiTime className="w-4 h-4 mr-1" />
                        <span>Last Push: {formatDate(repo.pushed_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Post;
