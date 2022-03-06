import React from "react";
import Image from "next/image";

type Props = {
  index?: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  align?: "left" | "right";
};

const ShopValue: React.FC<Props> = ({
  index = 0,
  title,
  description,
  image,
  align = "left",
}) => {
  const containerDirection =
    align === "left" ? "sm:flex-row" : "sm:flex-row-reverse";
  const contentDirection = align === "left" ? "items-start" : "items-end";
  const textAlign = align === "left" ? "text-left" : "text-right";

  return (
    <div className={`flex flex-col ${containerDirection}`}>
      <div className="w-full aspect-square relative sm:w-80 md:w-96 lg:w-1/2">
        <Image
          className="object-cover"
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-8 h-8 lg:w-12" />
      <div
        className={`flex flex-1 flex-col ${contentDirection} px-6 sm:px-0 sm:pt-4 lg:pt-8 xl:pt-12`}
      >
        <p className={`font-medium text-xl text-black ${textAlign}`}>
          0{index + 1}
        </p>
        <p
          className={`font-bold text-black text-4xl tracking-tighter mb-6 ${textAlign} md:text-6xl lg:text-7xl xl:w-3/4`}
        >
          {title}
        </p>
        <p className={`${textAlign} text-xs leading-relaxed md:w-3/4 lg:w-1/2`}>
          {description}
        </p>
      </div>
      <div className="hidden w-8 h-8 sm:block lg:w-12" />
    </div>
  );
};

export default ShopValue;
