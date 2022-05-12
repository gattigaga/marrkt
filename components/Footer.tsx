import React from "react";

import MenuLink from "./MenuLink";
import useUserQuery from "../hooks/user/use-user-query";

type Props = {};

const Footer: React.FC<Props> = ({}) => {
  const { data: myself } = useUserQuery();

  return (
    <footer className="pt-12 pb-8 bg-black" data-scroll-section>
      <div className="px-6 py-16 border-t border-white border-opacity-10 md:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-20 sm:gap-x-20 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-full">
            <p className="text-7xl tracking-tighter font-bold text-white sm:text-9xl">
              marrkt.
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <p className="font-medium text-white text-xs mb-6">ABOUT</p>
            <p className="text-xs text-white opacity-40 leading-relaxed">
              Founded in 2022, Marrkt believe that the clothes should made from
              high-quality materials but still make people comfort by wear it.
            </p>
          </div>

          <div>
            <p className="font-medium text-white text-xs mb-6">STORE</p>
            <ul>
              <li className="flex opacity-40 mb-2">
                <MenuLink label="Home" href="/" color="white" />
              </li>
              <li className="flex opacity-40 mb-2">
                <MenuLink label="Products" href="/products" color="white" />
              </li>
              <li className="flex opacity-40">
                <MenuLink
                  label={myself ? "My Account" : "Login"}
                  href={myself ? "/account/profile" : "/account/login"}
                  color="white"
                />
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-white text-xs mb-6">CONTACT</p>
            <ul>
              <li className="flex opacity-40 mb-2">
                <MenuLink
                  label="Email us"
                  href="mailto:dummy@marrkt.com"
                  color="white"
                />
              </li>
              <li className="flex opacity-40">
                <MenuLink
                  label="+62 889 9450 4534"
                  href="tel:+6288994504534"
                  color="white"
                />
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="font-medium text-white text-xs mb-6">ADDRESS</p>
            <p className="text-xs text-white opacity-40 leading-relaxed">
              Perumahan 12 Kuil Zodiak no. 12
              <br />
              Jawa Timur, Indonesia
            </p>
          </div>
        </div>
      </div>
      <div className="border-y border-white border-opacity-10 px-6 py-4 md:px-8">
        <p className="text-xs text-white opacity-40">
          MARRKT | {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
