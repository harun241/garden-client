import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const faq = [
    {
      q: "How to grow plants in small spaces?",
      a: "Use vertical gardening, hanging pots, or compact plants like herbs, lettuce, or tomatoes."
    },
    {
      q: "How often should I water indoor plants?",
      a: "Most indoor plants need water once a week depending on light & humidity."
    },
    {
      q: "Which fertilizer is best for beginners?",
      a: "A balanced NPK (10-10-10) or organic compost is ideal."
    },
    {
      q: "How can I prevent pests naturally?",
      a: "Spray neem oil, garlic water, or soapy water every 1–2 weeks."
    }
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 dark:bg-black">

      {/* Floating Animated Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl 
            flex items-center gap-2 font-semibold
            animate-pulse hover:animate-none hover:scale-110 
            transition-all duration-300 ease-out
          "
        >
          <MessageCircle className="w-6 h-6" />
          Ask GardenBot
        </button>
      )}

      {/* Chatbox */}
      {open && (
        <div
          className="
             w-80 p-4 rounded-2xl shadow-2xl border 
            animate-[fadeIn_0.3s_ease-out,slideUp_0.4s_ease-out]
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-bold text-green-700">
              🌱 GardenBot
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <X size={22} />
            </button>
          </div>

          <p className="text-sm text-gray-4000 mt-2">
            I can help you with gardening questions! 🌿
          </p>

          {/* Question List */}
          <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
            {faq.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(item)}
                className="
                  w-full text-left px-3 py-2  
                  border border-green-200 rounded-lg text-sm transition
                "
              >
                ❓ {item.q}
              </button>
            ))}
          </div>

          {/* Answer Section */}
          {selected && (
            <div
              className="
                mt-4 p-3  dark:text-white
                rounded-lg animate-[fadeIn_0.3s_ease-out]
              "
            >
              <p className="font-semibold  ">{selected.q}</p>
              <p className="text-sm dark:text-white mt-1">{selected.a}</p>

              <button
                onClick={() => setSelected(null)}
                className="mt-2 text-xs underline "
              >
                Close Answer
              </button>
            </div>
          )}
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
