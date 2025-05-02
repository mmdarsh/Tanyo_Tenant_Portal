import React, { useState } from "react";
import { FiMaximize, FiDownload, FiX } from "react-icons/fi";

const products = [
  {
    name: "INFINITY SOFA LEG WITH FRAME...",
    model: "PATTA-01",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "DINING REVOLVING RING",
    model: "111",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "CUSHION",
    model: "CUSHION",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "CAP",
    model: "CAP",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "INFINITY SOFA LEG WITH FRAME...",
    model: "PATTA-01",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "DINING REVOLVING RING",
    model: "111",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "CUSHION",
    model: "CUSHION",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "CAP",
    model: "CAP",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  
  // Add more products as needed
];

const ImageOverlay: React.FC<{
  image: string;
  alt: string;
  onClose: () => void;
}> = ({ image, alt, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imgContainerRef = React.useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (imgContainerRef.current) {
      if (imgContainerRef.current.requestFullscreen) {
        imgContainerRef.current.requestFullscreen();
      } else if ((imgContainerRef.current as any).webkitRequestFullscreen) {
        (imgContainerRef.current as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download image.');
    }
  };

  React.useEffect(() => {
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", exitHandler);
    return () => document.removeEventListener("fullscreenchange", exitHandler);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
      <div
        ref={imgContainerRef}
        className="relative flex flex-col items-center justify-center w-full h-full"
      >
        {/* Close Button */}
        <button
          className="fixed top-4 right-4 text-black! text-3xl font-bold hover:text-[#ffc901] focus:outline-none z-50"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        {/* Image */}
        <img
          src={image}
          alt={alt}
          className="max-h-[70vh] max-w-[90vw] rounded shadow-lg object-contain bg-white"
        />
        {/* Controls */}
        <div className="mt-6 flex flex-row flex-wrap gap-4 justify-center items-center w-full">
          <button
            className="bg-[#ffc901] text-black p-2 rounded-full shadow hover:bg-yellow-400 text-xl"
            onClick={handleFullscreen}
            title="View Fullscreen"
          >
            <FiMaximize />
          </button>
          <button
            className="bg-[#ffc901] text-black p-2 rounded-full shadow hover:bg-yellow-400 text-xl"
            onClick={handleDownload}
            title="Download Image"
          >
            <FiDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

const Body: React.FC = () => {
  const [overlay, setOverlay] = useState<null | { image: string; alt: string }>(
    null
  );

  return (
    <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {overlay && (
        <ImageOverlay
          image={overlay.image}
          alt={overlay.alt}
          onClose={() => setOverlay(null)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded shadow-lg overflow-hidden flex flex-col relative group"
          >
            {/* Badge */}
            <span className="absolute top-2 left-2 bg-[#ffc901] text-xs font-semibold px-3 py-1 rounded z-10">
              ADDITIONAL ACCESSERIES
            </span>
            {/* Image */}
            <div
              className="h-56 w-full overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
              onClick={() =>
                setOverlay({ image: product.image, alt: product.name })
              }
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            {/* Details */}
            <div className="p-4 flex flex-col flex-1">
              <div className="font-semibold text-lg truncate mb-2 uppercase">
                {product.name}
              </div>
              <div className="bg-gray-100 rounded p-2 text-xs font-medium text-gray-700 mb-1">
                Model No : {product.model}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Body;
