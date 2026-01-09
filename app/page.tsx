"use client";

import { use, useState } from "react";
import { getGithubData } from "@/utils/github";

export default function Home(){
  const [username, setUsername] = useState("")
  
  // Back to this later
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("")

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await getGithubData(username);
      setData(result);
    } catch(err) {
      setError("User not found or API limit reached.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">GitCard Generator</h1>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Github Username"
          className="p-3 rounded text-black font-bold"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-6 py-3 rounded font-bold hover:bg-blue-600 transition"
        >
          {loading? "Anaylyzing..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* RAW DATA DISPLAY - JUST FOR TESTING */}
      {data && (
        <div className="w-full max-w-4xl grid-cols-2 gap-4">
          {/* BOX 1: Profile */}
          <div className="bg-gray-800 p-5 rounded border border-gray-700">
            <h2 className="text-xl font-bold text-blue-400">Profile</h2>
            <p>Name: {data.profile.name}</p>
            <p>Bio: {data.profile.bio}</p>
            <img src={data.profile.avatar_url} alt="avatar" className="w-20 h-20 rounded-full mt-2"/>
          </div>

          {/* BOX 2: Stats */}
          <div className="bg-gray-800 p-5 rounded border border-gray-700">
            <h2 className="text-xl font-bold text-green-400">Stats</h2>
            <p>Total Repos: {data.profile.public_repos}</p>
            <p>Total Stars: {data.totalStars}</p>
          </div>

          {/* Box 3: Top Languages */}
          <div className="bg-gray-800 p-5 rounded border border-gray-700">
            <h2 className="text-xl font-bold text-purple-400">Top Languages</h2>
            <u>
              {data.topLanguages.map((l: any) => (
                <li key={l.lang}> {l.lang}: {l.count} repos </li>
              ))}
            </u>
          </div>

          {/* Box 4: Best Repo */}
          <div className="bg-gray-800 p-5 rounded border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400">Hall of Fame</h2>
            <p className="font-bold">{data.bestRepo?.name}</p>
            <p className="text-sm text-gray-400">{data.bestRepo?.description}</p>
            <p>{data.bestRepo?.stargazers_count} Stars</p>
          </div>
        </div>
      )}
    </div>
  );
}