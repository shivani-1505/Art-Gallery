import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

// Use the same image data from the original component
const imageData = {
  All: ["https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg", "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg", "https://i.pinimg.com/736x/79/c2/41/79c241ffee4456a2b8cc8515d4dc41df.jpg"],
  Renaissance: ["https://i.pinimg.com/736x/4c/ca/32/4cca324472f172eb397189cc667d3cde.jpg", "https://i.pinimg.com/736x/7f/29/9d/7f299d29c147e3aaf0362e9b9de2abff.jpg"],
  Abstract: ["https://i.pinimg.com/736x/6a/30/ad/6a30ad236772c6481c42bea92b6b20be.jpg", "https://ik.imagekit.io/theartling/prod/original_images/62.jpg?tr=w-950", "https://ik.imagekit.io/theartling/prod/original_images/chu_teh_chun.jpg?tr=w-950"],
  Animal: ["https://drawpaintacademy.com/wp-content/uploads/2022/07/Albrecht-Du%E2%95%A0erer-Young-Hare-1502.jpg", "https://drawpaintacademy.com/wp-content/uploads/2022/07/Frans-Snyders-Concert-of-Birds-1629-1630.jpg"],
  "Geometric Art": ["https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/18040_1_l.jpg?resize=1024%2C687&ssl=1", "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo1.jpg?w=517&ssl=1", "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo4.jpg?resize=1024%2C1024&ssl=1"],
  Modern: ["https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww"],
};

// Artist data mapping
const artistData = {
  "Bonita Rizka": {
    images: [
      "https://i.pinimg.com/474x/25/c9/3d/25c93dd41f16048a836d5837dae4e638.jpg", 
      "https://i.pinimg.com/736x/a9/12/73/a91273677b2faec433397d6c1cdf3475.jpg"
    ]
  },
  "Michel Angelo": {
    images: [
      "https://i.pinimg.com/736x/4c/ca/32/4cca324472f172eb397189cc667d3cde.jpg", 
      "https://i.pinimg.com/736x/7f/29/9d/7f299d29c147e3aaf0362e9b9de2abff.jpg"
    ]
  },
  "Pablo Picasso": {
    images: [
      "https://i.pinimg.com/736x/6a/30/ad/6a30ad236772c6481c42bea92b6b20be.jpg", 
      "https://ik.imagekit.io/theartling/prod/original_images/62.jpg?tr=w-950"
    ]
  },
  "Albrecht Dürer": {
    images: [
      "https://drawpaintacademy.com/wp-content/uploads/2022/07/Albrecht-Du%E2%95%A0erer-Young-Hare-1502.jpg"
    ]
  },
  "Frans Snyders": {
    images: [
      "https://drawpaintacademy.com/wp-content/uploads/2022/07/Frans-Snyders-Concert-of-Birds-1629-1630.jpg"
    ]
  },
  "Wassily Kandinsky": {
    images: [
      "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/18040_1_l.jpg?resize=1024%2C687&ssl=1", 
      "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2016/05/geo1.jpg?w=517&ssl=1"
    ]
  },
  "Modern Artist": {
    images: [
      "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww", 
      "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZXJuJTIwYXJ0fGVufDB8fDB8fHww"
    ]
  }
};

// Map images to artists
const imageToArtist = {};
Object.entries(artistData).forEach(([artist, data]) => {
  data.images.forEach(img => {
    imageToArtist[img] = artist;
  });
});

export default function FullArtCatalog({ onBackClick, onArtistClick }) {
  const [selected, setSelected] = useState("All");
  const [imagesToShow, setImagesToShow] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get all images for display
  const getAllImages = () => {
    if (selected === "All") {
      // Flatten the array of all images from all categories
      return Object.values(imageData).flat();
    }
    return imageData[selected] || [];
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setImagesToShow(getAllImages());
      setLoading(false);
    }, 5);
  }, [selected]);

  const categories = Object.keys(imageData);

  // Get artist name for a specific image
  const getArtistName = (image) => {
    return imageToArtist[image] || "Artist Name";
  };

  // Handle artist click
  const handleArtistClick = (artistName, e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    if (onArtistClick) {
      onArtistClick(artistName, artistData[artistName]?.images || []);
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden text-white m-0 p-0">
      {/* Fixed Header with Back Button and Categories */}
      <div className="sticky top-10 z-10 bg-black bg-opacity-95 pt-10 pb-4 px-16">
        <div className="flex items-center mb-6 relative">
          {/* Back Button (positioned left) */}
          <button 
            onClick={onBackClick} 
            className="text-white hover:text-gray-300 transition-colors absolute left-0"
            aria-label="Go back to main page"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          
          {/* Page Title (centered) */}
          <h1 className="text-3xl font-semibold text-center w-full">Artwork for Sale</h1>
        </div>

        {/* Category Buttons */}
        <div className="flex space-x-6 text-sm overflow-x-auto pb-2 justify-center w-full">
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

      {/* Main Content - Full Screen Grid */}
      <div className="px-16 py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnimatePresence mode="popLayout">
            {!loading &&
              imagesToShow.map((image, index) => (
                <motion.div
                  key={`${selected}-${image}-${index}`}
                  className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Artwork Image - Full Height */}
                  <img
                    src={image}
                    alt={`Artwork ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay with Price */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-semibold">Artwork {index + 1}</h3>
                        {/* Make artist name clickable */}
                        <p 
                          className="text-gray-300 text-sm cursor-pointer hover:text-white hover:underline"
                          onClick={(e) => handleArtistClick(getArtistName(image), e)}
                        >
                          {getArtistName(image)}
                        </p>
                      </div>
                      <div className="bg-white text-black px-4 py-2 rounded-full shadow-md font-bold">
                        $300
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}