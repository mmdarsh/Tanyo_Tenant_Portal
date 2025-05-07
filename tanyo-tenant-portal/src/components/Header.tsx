import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import logo from "../assets/logo.jpeg";

const Header: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white w-full p-4 md:p-6 border-b border-gray-200">
      <div className="w-full  mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
        {/* Left: Logo and Company Name */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-2 md:gap-4">
          <div className="flex items-center lg:w-full  md:w-auto">
            <img
              src={logo}
              alt="Shreem Logo"
              className="w-16 h-16 object-contain rounded mr-4 bg-white border border-gray-200"
              onError={(e: any) => {
                e.target.style.display = "none";
              }}
            />
            <span className="text-2xl md:text-3xl w-[70%] lg:w-full font-light text-[#4B4BAF]">
              Shreem Furniture and Interior
            </span>
          </div>
          {/* Company Details Button - visible on mobile only */}
          <button
            className="bg-transparent! text-black rounded font-semibold p-2 absolute top-4 right-0 md:hidden flex items-center gap-2 self-end"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <FaInfoCircle />{" "}
          </button>
        </div>

        {/* Info Section - visible on md+ */}
        <div className="hidden md:flex flex-row items-start gap-8 border-l-2 border-gray-300 pl-8 ml-auto w-auto">
          {/* Address Column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-2 mt-1">
                <FaMapMarkerAlt />
              </span>
              <span className="text-black text-sm md:text-base leading-tight">
                5, Ratnam Industrial Hub, Inside Pirana gate,
                <br className="hidden md:block" />
                Oad gam, S.P. Ring Road, Ahmedabad, Gujarat, 382427
              </span>
            </div>
          </div>
          {/* Phone & Email Column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-1">
                <FaEnvelope />
              </span>
              <span className="text-black text-sm md:text-base mr-2">
                csheth94@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-1">
                <FaPhone className="scale-x-[-1]" />
              </span>
              <span className="text-black text-sm md:text-base">
                6357344007
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Info Section - mobile dropdown */}
      {showDetails && (
        <div className="flex flex-col gap-4 rounded p-4 mt-4 md:hidden animate-fade-in  border-t border-gray-200">
          <div className="flex items-start gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-2 mt-1">
              <FaMapMarkerAlt />
            </span>
            <span className="text-black text-sm leading-tight">
              5, Ratnam Industrial Hub, Inside Pirana gate,
              <br />
              Oad gam, S.P. Ring Road, Ahmedabad, Gujarat, 382427
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-1">
              <FaEnvelope />
            </span>
            <span className="text-black text-sm mr-2">csheth94@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-black mr-1">
              <FaPhone className="scale-x-[-1]" />
            </span>
            <span className="text-black text-sm">6357344007</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
