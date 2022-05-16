import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import useSignOutMutation from "../hooks/auth/use-sign-out-mutation";

type Props = {};

const AccountMenu: React.FC<Props> = () => {
  const router = useRouter();
  const signOutMutation = useSignOutMutation();

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
      await signOutMutation.mutateAsync();
      await router.push("/auth/signin");
    } catch (error: any) {
      console.log(error);
      toast(error.message || "Failed to logout.");
    } finally {
      Cookies.remove("access_token", {
        path: "/",
      });
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
