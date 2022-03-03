import React from "react";
import Image from "next/image";

type Props = {
  index?: number;
  title: string;
  description: string;
  image: string;
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
    align === "left" ? "md:flex-row" : "md:flex-row-reverse";
  const contentDirection = align === "left" ? "items-start" : "items-end";
  const textAlign = align === "left" ? "text-left" : "text-right";

  return (
    <div className={`flex flex-col ${containerDirection}`}>
      <Image
        className="object-cover"
        src={image}
        alt={title}
        width={720}
        height={800}
      />
      <div className="w-16 h-6" />
      <div className={`flex flex-col ${contentDirection}`}>
        <p className={`font-medium text-xl text-black ${textAlign}`}>
          0{index + 1}
        </p>
        <p
          className={`font-bold text-black text-4xl tracking-tighter mb-6 ${textAlign} md:text-6xl`}
        >
          {title}
        </p>
        <p className={`${textAlign} md:w-1/2`}>{description}</p>
      </div>
    </div>
  );
};

export default ShopValue;
