import React from "react";
import Lottie from "lottie-react";
import gardenAnimation from "../assets/Animation - 1748609687395 (1).json";

const LottieAnimation = () => {
  return (
    <div className="w-72 mx-auto mt-20 bg-gray-100 rounded-xl">
      <Lottie animationData={gardenAnimation} loop={true} />
    </div>
  );
};

export default LottieAnimation;
