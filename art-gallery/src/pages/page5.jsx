import React, { useState } from "react";

const FAQWebpage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How does the landing page engage and interact with visitors?",
      answer:
        "Interactive elements such as event calendars, virtual tours, or multimedia content allow visitors to engage with the museum's offerings directly.",
    },
    {
      question: "What kind of artwork does the landing page show?",
      answer:
        "The landing page showcases a variety of curated artworks, blending modern and classical styles.",
    },
    {
      question: "Are there interactives that enhance the user experience?",
      answer:
        "Yes, interactive components like dynamic galleries and 3D models elevate the user experience.",
    },
    {
      question: "How does the landing page layout reflect the aesthetic?",
      answer:
        "The layout uses minimalistic and modern design principles to reflect a clean and aesthetic feel.",
    },
  ];

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="py-12 px-6 text-center">
        <span className="uppercase text-sm font-medium tracking-wide">
          FAQ's
        </span>
        <h1 className="text-4xl font-bold mt-2">Frequently Ask Questions</h1>
      </header>

      {/* FAQ Section */}
      <main className="px-6 md:px-20 flex-grow">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-b pb-4 ${
                activeIndex === index ? "text-gray-800" : "text-gray-500"
              }`}
            >
              <button
                className="flex justify-between w-full text-lg font-medium focus:outline-none"
                onClick={() => toggle(index)}
              >
                {item.question}
                <span
                  className={`transform ${
                    activeIndex === index ? "rotate-90" : ""
                  } transition-transform`}
                >
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-sm">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg">Artversnght</h3>
            <p className="mt-2">Art project, Gallery, Publishing</p>
            <p>3891 Ranchview Dr. Richardson, California 62339</p>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="font-semibold">About Us</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Careers</li>
              <li>Services</li>
              <li>Project</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h4 className="font-semibold">Sign Up for Newsletter</h4>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                ➔
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQWebpage;
