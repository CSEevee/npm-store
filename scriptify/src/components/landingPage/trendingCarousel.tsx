import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from 'react-feather';

const TrendingCarousel = () => {
  const navigate = useNavigate();
  const [popularPackages, setPopularPackages] = useState([]);
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);

  useEffect(() => {
    fetchPopularPackages();
  }, []);

  const fetchPopularPackages = async () => {
    try {
      const response = await fetch("https://api.npms.io/v2/search?q=keywords:popular&size=6");
      if (!response.ok) {
        throw new Error("Failed to fetch popular packages");
      }
      const data = await response.json();
      setPopularPackages(data.results.map(result => result.package.name));
    } catch (error) {
      console.error("Error fetching popular packages:", error);
    }
  };

  const goToHome = () => {
    navigate("/home");
  };

  const prevPackage = () => {
    setCurrentPackageIndex(prevIndex => (prevIndex === 0 ? popularPackages.length - 1 : prevIndex - 1));
  };

  const nextPackage = () => {
    setCurrentPackageIndex(prevIndex => (prevIndex === popularPackages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      {/* Giant button covering the entire div */}
      <button
        onClick={goToHome}
        className="absolute inset-0 w-full h-full bg-transparent border-none cursor-pointer"
      >
        {/* Content inside the button */}
        <div className="h-full w-full flex items-center justify-center relative">
          <h2 className="text-black font-semibold text-4xl">{popularPackages[currentPackageIndex]}</h2>
          <button
            className="bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md mt-4"
            onClick={goToHome}
          >
            Shop Now
          </button>
        </div>
      </button>

      {/* Prev and Next buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md"
        onClick={prevPackage}
      >
        <ArrowLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md"
        onClick={nextPackage}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default TrendingCarousel;
