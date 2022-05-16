import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { gsap, Power2 } from "gsap";

export type Exposed = {
  runShowUpAnimation: () => void;
};

type Props = {
  index?: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  align?: "left" | "right";
  eventName?: string;
};

const ShopValue: React.ForwardRefRenderFunction<Exposed, Props> = (
  { index = 0, title, description, image, align = "left", eventName },
  ref
) => {
  const refImage = useRef(null);
  const refText = useRef(null);

  const containerDirection =
    align === "left" ? "sm:flex-row" : "sm:flex-row-reverse";
  const contentDirection = align === "left" ? "items-start" : "items-end";
  const textAlign = align === "left" ? "text-left" : "text-right";

  const runShowUpAnimation = () => {
    gsap.fromTo(
      refImage.current,
      {
        opacity: 0,
        scale: 2,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: Power2.easeOut,
      }
    );

    gsap.fromTo(
      refText.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: Power2.easeOut,
      }
    );
  };

  useImperativeHandle(ref, () => ({
    runShowUpAnimation,
  }));

  return (
    <div className={`flex flex-col ${containerDirection}`}>
      <div className="w-full aspect-square relative overflow-hidden sm:w-80 md:w-96 lg:w-1/2">
        <div ref={refImage} className="w-full h-full opacity-0">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="w-8 h-8 lg:w-12" />
      <div
        ref={refText}
        className={`flex flex-1 flex-col ${contentDirection} px-6 opacity-0 sm:px-0 sm:pt-4 lg:pt-8 xl:pt-12`}
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

export default forwardRef(ShopValue);
