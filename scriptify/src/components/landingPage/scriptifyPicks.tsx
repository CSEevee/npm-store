import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScriptifyPicks = () => {
  const navigate = useNavigate();
  const picks = [
    {
      name: "Jest",
      downloads: "10M+",
      description: "JavaScript Testing Framework",
      quote: "Jest makes testing a breeze!",
      author: "Allison"
    },
    {
      name: "Webpack",
      downloads: "20M+",
      description: "Module Bundler",
      quote: "Webpack makes building my app enjoyable!",
      author: "Matt"
    },
    {
      name: "ESLint",
      downloads: "15M+",
      description: "JavaScript Linter",
      quote: "Readable code is the best with ESLint!",
      author: "Victoria"
    },
    {
      name: "Axios",
      downloads: "30M+",
      description: "Promise based HTTP client for the browser and Node.js",
      quote: "Axios makes fetch requests fun!",
      author: "Nick"
    }
  ];

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {picks.map((pick, index) => (
        <div key={index} className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{pick.name}</h3>
          <p className="text-gray-500 mb-2">Downloads: {pick.downloads}</p>
          <p className="text-gray-600 mb-4">{pick.description}</p>
          <p className="italic text-gray-700">"{pick.quote}" - {pick.author}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={goToHome}
          >
            Shop Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ScriptifyPicks;