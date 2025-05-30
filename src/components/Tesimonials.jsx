import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Oeishi",
    feedback: "Amazing gardening tips! My plants are thriving now.",
    photo:
      "https://i.ibb.co/mrM39XM4/businesswoman-posing-23-2148142829.jpg",
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
    feedback:
      "Love the plant care guides, very detailed and easy to follow.",
    photo:
      "https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className=" py-12 px-4">
      <h2 className="text-3xl bg-white max-w-fit font-semibold text-gray-800 mb-10 mx-auto">
  What Our Users Say
</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(({ id, name, feedback, photo }) => (
          <div
            key={id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <img
              src={photo}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <p className="italic text-gray-700 mb-3">"{feedback}"</p>
            <p className="font-semibold text-green-600">- {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
