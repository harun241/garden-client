import React, { useState } from "react";

const sampleInsights = [
  {
    id: 1,
    title: "Indoor Tomato Gardening",
    description: "Learn how to grow tomatoes indoors even in small apartments...",
    image: "https://i.ibb.co.com/SwqC48VT/image.png",
    author: "Alice Green",
  },
  {
    id: 2,
    title: "Vertical Herb Garden",
    description: "Maximize space with a vertical herb garden. Perfect for balconies...",
    image: "https://i.ibb.co.com/HfLYfX09/image.png",
    author: "Bob Flower",
  },
  {
    id: 3,
    title: "Composting Basics",
    description: "Turn your kitchen waste into rich compost for your plants...",
    image: "https://i.ibb.co.com/6chyn0PN/image.png",
    author: "Carol Leaf",
  },
  // New 5 insights
  {
    id: 4,
    title: "Succulent Care Tips",
    description: "Keep your succulents healthy with proper watering and sunlight...",
    image: "https://i.ibb.co.com/HfLYfX09/image.png",
    author: "David Thorn",
  },
  {
    id: 5,
    title: "Organic Fertilizers",
    description: "Make your own organic fertilizers at home for healthy plants...",
    image: "https://i.ibb.co.com/HfLYfX09/image.png",
    author: "Emma Roots",
  },
  {
    id: 6,
    title: "Container Gardening",
    description: "Grow flowers and vegetables in containers, ideal for patios...",
    image: "https://i.ibb.co.com/6chyn0PN/image.png",
    author: "Frank Bloom",
  },
  {
    id: 7,
    title: "Hydroponics 101",
    description: "Learn the basics of hydroponic gardening for faster growth...",
    image: "https://i.ibb.co.com/6chyn0PN/image.png",
    author: "Grace Green",
  },
  {
    id: 8,
    title: "Pruning Techniques",
    description: "Master pruning to improve plant health and increase yield...",
    image: "https://i.ibb.co.com/6chyn0PN/image.png",
    author: "Henry Leaf",
  },
];

const GardeningInsightsFrontend = () => {
  const [insights] = useState(sampleInsights);

  return (
    <section className="py-12  dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-500 dark:text-green-300 mb-10">
        🌱 Gardening Insights
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="  p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              src={insight.image}
              alt={insight.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg md:text-xl font-semibold  dark:text-green-500 mb-2">
              {insight.title}
            </h3>
            <p className=" dark:text-white text-sm">
              {insight.description}
            </p>
            <p className="mt-3 text-xs dark:text-gray-400">
              By {insight.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GardeningInsightsFrontend;
