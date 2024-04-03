import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from 'react-feather';

const ImageCarousel = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const packages = ["React", "Vue", "Angular", "Node.js", "Express", "Next.js"];
  const colors = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];

  const goToHome = () => {
    navigate("/home");
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? packages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === packages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      {packages.map((packageName, index) => (
        <div
          key={index}
          style={{ display: index === currentImageIndex ? "block" : "none" }}
          className={`absolute inset-0 ${colors[index]} border-2 border-white bg-opacity-50`}
        >
          <div className="h-full w-full flex items-center justify-center relative">
            <h2 className="text-black font-semibold text-8xl">{packageName}</h2>
            <button
              className="bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md mt-4"
              onClick={goToHome}
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md"
        onClick={prevImage}
      >
        <ArrowLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white px-4 py-2 rounded-md text-gray-800 font-semibold shadow-md"
        onClick={nextImage}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default ImageCarousel;
