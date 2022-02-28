import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "../helpers/supabase";
import { toast } from "react-toastify";

type AccountMenuProps = {};

const AccountMenu: React.FC<AccountMenuProps> = ({}) => {
  const router = useRouter();

  const menus = [
    {
      id: 1,
      label: "Profile",
      url: "/account/profile",
    },
    {
      id: 2,
      label: "Orders",
      url: "/account/orders",
    },
  ];

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.push("/account/login");
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        toast(error?.message || "Failed to logout.");
      }
    }
  };

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
      <button
        type="button"
        className="w-full border-b border-gray-200 py-3 text-xs text-red-500"
        onClick={logout}
      >
        <p className="text-left">Logout</p>
      </button>
    </div>
  );
};

export default AccountMenu;
