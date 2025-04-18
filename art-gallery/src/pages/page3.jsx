import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { MdArrowForward } from "react-icons/md";

// Sample images for each category
const imageData = {
  All: ["https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg", "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg", "https://i.pinimg.com/736x/79/c2/41/79c241ffee4456a2b8cc8515d4dc41df.jpg"],
  Renaissance: ["https://i.pinimg.com/736x/4c/ca/32/4cca324472f172eb397189cc667d3cde.jpg", "https://i.pinimg.com/736x/7f/29/9d/7f299d29c147e3aaf0362e9b9de2abff.jpg"],
  Abstract: ["https://i.pinimg.com/736x/6a/30/ad/6a30ad236772c6481c42bea92b6b20be.jpg", "https://ik.imagekit.io/theartling/prod/original_images/62.jpg?tr=w-950", "https://ik.imagekit.io/theartling/prod/original_images/chu_teh_chun.jpg?tr=w-950"],
  Animal: ["https://drawpaintacademy.com/wp-content/uploads/2022/07/Albrecht-Du%E2%95%A0erer-Young-Hare-1502.jpg", "https://drawpaintacademy.com/wp-content/uploads/2022/07/Frans-Snyders-Concert-of-Birds-1629-1630.jpg"],
  "Geometric Art": ["https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/18040_1_l.jpg?resize=1024%2C687&ssl=1", "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo1.jpg?w=517&ssl=1", "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo4.jpg?resize=1024%2C1024&ssl=1"],
  Modern: ["https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww"],
};

export default function ArtSale({ onSeeMoreClick }) {
  const [selected, setSelected] = useState("Renaissance");
  const [imagesToShow, setImagesToShow] = useState(imageData[selected] || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setImagesToShow(imageData[selected] || []);
      setLoading(false);
    }, 5);
  }, [selected]);

  const categories = Object.keys(imageData);

  return (
    <div className="bg-black h-screen w-screen flex flex-col overflow-hidden">
      {/* Page container */}
      <div className="flex flex-col h-full w-full">
        {/* Page Title */}
<div className="text-4xl font-semibold mt-16 self-start ml-4 sm:self-start sm:ml-20">
  Artwork For Sale
</div>

      {/* Horizontally scrollable categories */}
<div className="w-full overflow-x-auto no-scrollbar mb-4 self-start sm:flex sm:justify-center">
  <div className="flex space-x-4 text-sm mt-6 px-4 pb-2 min-w-max inline-flex">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setSelected(category)}
        className={`relative pb-1 transition-all border-none outline-none focus:outline-none bg-transparent whitespace-nowrap ${
          selected === category ? "text-white font-semibold" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {category}
        {selected === category && (
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white"></span>
        )}
      </button>
    ))}
  </div>
</div>

{/* Horizontally scrollable images */}
<div className="w-full overflow-x-auto no-scrollbar flex-grow self-start sm:flex sm:justify-center">
  <motion.div
    className="flex space-x-4 px-4 h-full inline-flex"
    initial="hidden"
    animate="visible"
    variants={{
      visible: { transition: { staggerChildren: 0.2 } },
    }}
  >
    <AnimatePresence mode="popLayout">
      {!loading &&
        imagesToShow.map((image, index) => (
          <motion.div
            key={image}
            className="flex-shrink-0 w-64 h-80 bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.2 }}
          >
            {/* Price Button */}
            <button className="absolute bottom-16 left-4 bg-white text-black px-6 py-2 rounded-full shadow-md font-bold text-lg">
              $300
            </button>

            {/* Artwork Image */}
            <img
              src={image}
              alt={`Artwork ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
    </AnimatePresence>
  </motion.div>
</div>
        {/* See More Button - Centered */}
        <div className="flex justify-center items-center my-6">
          <button 
            onClick={onSeeMoreClick} 
            className="bg-transparent border-0 p-0 focus:outline-none"
          >
            <HoverBorderGradient 
              containerClassName="rounded-3xl p-0.5"
              className="text-xs font-semibold px-8 py-2 rounded-xl flex justify-center items-center gap-2 w-auto"
            >
              <span>See More</span>
              <MdArrowForward className="text-white text-lg" />
            </HoverBorderGradient>
          </button>
        </div>
      </div>
    </div>
  );
}