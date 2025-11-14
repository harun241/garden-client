import React from "react";

const weeklyTips = [
  {
    id: 1,
    title: "Watering Schedule",
    description: "Learn how to water your plants properly to avoid root rot.",
    author: "Alice Green",
  },
  {
    id: 2,
    title: "Soil Nutrition",
    description: "Use compost and organic fertilizers for healthy growth.",
    author: "Bob Flower",
  },
  {
    id: 3,
    title: "Indoor Light",
    description: "Position plants near windows for optimal sunlight.",
    author: "Carol Leaf",
  },
  {
    id: 4,
    title: "Pest Control",
    description: "Natural remedies to keep pests away from your garden.",
    author: "David Thorn",
  },
];

const GardeningTipsWeek = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto  dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-500 dark:text-green-300 mb-8">
        🌿 Gardening Tips of the Week
      </h2>

      <div className="flex overflow-x-auto gap-6 px-4">
        {weeklyTips.map((tip) => (
          <div
            key={tip.id}
            className="min-w-[250px]  dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 "
          >
            <h3 className="font-semibold  dark:text-gray-500 mb-2">
              {tip.title}
            </h3>
            <p className=" dark:text-gray-300 text-sm">{tip.description}</p>
            <p className="mt-3 text-xs  dark:text-gray-800">
              By {tip.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GardeningTipsWeek;
