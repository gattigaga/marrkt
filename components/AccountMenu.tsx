import Link from "next/link";
import React from "react";

type AccountMenuProps = {};

const AccountMenu: React.FC<AccountMenuProps> = ({}) => {
  const menus = [
    {
      id: 1,
      label: "Profile",
      url: "#",
    },
    {
      id: 2,
      label: "Orders",
      url: "#",
    },
    {
      id: 3,
      label: "Logout",
      url: "#",
    },
  ];

  return (
    <div>
      <h1 className="text-md font-medium text-black mb-8">Menu</h1>
      {menus.map((menu) => {
        return (
          <Link key={menu.id} href={menu.url}>
            <a>
              <div className="border-b border-gray-200 py-3">
                <p className="text-xs text-black">{menu.label}</p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountMenu;
