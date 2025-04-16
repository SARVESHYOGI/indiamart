import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomePageContent() {
  const category = [
    {
      name: "Electronics",
      image: "/accessories.png",
      link: "/Electronics",
    },
    {
      name: "Mens Clothing",
      image: "/menware.png",
      link: "/MensCloths",
    },
    {
      name: "Footwear",
      image: "/footware.png",
      link: "/Footware",
    },
    {
      name: "Womens Clothing",
      image: "/ladiesware.png",
      link: "/WomenCloths",
    },
    {
      name: "Kids Toys",
      image: "/kidstoys.png",
      link: "/KidsToys",
    },
    {
      name: "Night Lamp",
      image: "/nightlamps.png",
      link: "/Nightlamp",
    },
  ];
  const poster = [
    {
      name: "headphone",
      image: "/p1.png",
      link: "/p",
    },
    {
      name: "mosquito",
      image: "/p2.png",
      link: "/p",
    },
    {
      name: "air freshner",
      image: "/p3.png",
      link: "/p",
    },
    {
      name: "lamp",
      image: "/p4.png",
      link: "/p",
    },
  ];
  const imageStyle: React.CSSProperties = {
    objectFit: "contain",
    objectPosition: "center",
    borderRadius: "50%",
    backgroundColor: "#f0f000",
    padding: "0.5rem",
  };
  return (
    <div>
      <div className="w-[75%] mx-auto flex flex-wrap items-center justify-between bg-gray-100 p-1">
        {" "}
        {/* Added p-4 and flex-wrap */}
        {category.map((item) => (
          <div key={item.name} className="">
            {" "}
            {/* Added key and margin */}
            <div className="flex flex-col items-center justify-center mx-auto">
              <Link
                href={item.link}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative w-16 h-16">
                  {" "}
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={imageStyle}
                    fill
                    priority={item.name === "Electronics"}
                  />
                </div>
                <span className=" mt-2 text-sm text-wrap">{item.name}</span>{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="w-3/4 mx-auto flex items-center justify-between bg-gradient-to-r from-blue-200 to-blue-400 p-6 rounded-lg shadow-md h-auto md:h-72">
          <div className="text-xl md:text-3xl font-semibold text-blue-800 tracking-wide">
            Stay Cool This Summer
          </div>
          <div className="w-1/2 flex flex-wrap gap-4 rounded-md p-4 shadow-inner">
            {poster.map((item) => (
              <div
                key={item.name}
                className="w-1/2 sm:w-auto flex-shrink-0 flex flex-col items-center justify-center rounded-md bg-blue-100 hover:bg-blue-200 transition-colors duration-200 p-3"
              >
                <Link
                  href={item.link}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="text-xs md:text-sm text-blue-700 mt-2 font-medium">
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageContent;
