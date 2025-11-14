import React from "react";
import { Zoom, Fade } from "react-awesome-reveal";
import LottieAnimation from "./LottieAnimation";


const testimonials = [
  {
    id: 1,
    name: "Oeishi",
    feedback: "Amazing gardening tips! My plants are thriving now.",
    photo: "https://i.ibb.co/mrM39XM4/businesswoman-posing-23-2148142829.jpg",
  },
  {
    id: 2,
    name: "Rafi",
    feedback: "Great community and helpful advice for beginners.",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Maya",
    feedback: "Love the plant care guides, very detailed and easy to follow.",
    photo: "https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 px-4 ">
     
      <LottieAnimation/>

      <Fade triggerOnce>
        <h2 className="text-3xl font-semibold  text-green-500 mb-10 text-center mt-20">
          What Our Users Say
        </h2>
      </Fade>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(({ id, name, feedback, photo }) => (
          <Zoom triggerOnce key={id}>
            <div className="bg-transparent dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all">
              <img
                src={photo}
                alt={name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <p className="italic dark:text-white mb-3">
                "{feedback}"
              </p>
              <p className="font-semibold text-green-600 dark:text-green-400">
                - {name}
              </p>
            </div>
          </Zoom>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
