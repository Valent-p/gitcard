"use client";

import { use, useState } from "react";
import { getGithubData } from "@/utils/github";
import GitCard from "@/app/components/GitCard";

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

      {data && <GitCard data={data} />}
    </div>
  );
}