"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useState,
} from "react";
import {
  FiFileText,
  FiGrid,
  FiHome,
  FiList,
  FiLogOut,
  FiMenu,
  FiPlusCircle,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";

interface DashboardLayoutProps {
  children: ReactNode;
}

type UserRole = "user" | "admin";

interface SessionUser {
  role?: string;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [userRole, setUserRole] =
    useState<UserRole>("user");

  const [roleLoading, setRoleLoading] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    const getFreshSession = async () => {
      const { data } = await authClient.getSession({
        query: {
          disableCookieCache: true,
        },
      });

      const user = data?.user as
        | SessionUser
        | undefined;

      const role: UserRole =
        user?.role?.toLowerCase() === "admin"
          ? "admin"
          : "user";

      setUserRole(role);
      setRoleLoading(false);
    };

    getFreshSession();
  }, []);

  const dashboardItems = {
    user: [
      {
        icon: FiGrid,
        label: "Dashboard",
        href: "/dashboard/user",
      },
      {
        icon: FiList,
        label: "My Reports",
        href: "/dashboard/user/my-reports",
      },
      {
        icon: FiPlusCircle,
        label: "Report Item",
        href: "/items/add",
      },
      {
        icon: FiUser,
        label: "Profile",
        href: "/dashboard/user/profile",
      },
    ],

    admin: [
      {
        icon: FiGrid,
        label: "Dashboard",
        href: "/dashboard/admin",
      },
      {
        icon: FiUsers,
        label: "Users",
        href: "/dashboard/admin/users",
      },
      {
        icon: FiFileText,
        label: "Manage Items",
        href: "/dashboard/admin/items",
      },
    ],
  };

  const navItems = dashboardItems[userRole];

  const isActiveLink = (href: string) => {
    if (
      href === "/dashboard/user" ||
      href === "/dashboard/admin"
    ) {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();

    setSidebarOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#D8CFBC] bg-[#F7F3EA] px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#1F150C] hover:bg-[#EDE8DC]"
        >
          <FiMenu className="text-2xl" />
        </button>

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F150C] text-[#E1DCC9]">
            <HiOutlineMapPin className="text-xl" />
          </div>

          <span className="font-serif text-xl font-semibold text-[#1F150C]">
            FindBack
          </span>
        </Link>

        <div className="h-10 w-10" />
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex min-h-screen w-72 flex-col border-r border-[#D8CFBC] bg-[#F7F3EA] transition-transform duration-300 lg:translate-x-0 ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[#D8CFBC] px-5">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F150C] text-[#E1DCC9]">
              <HiOutlineMapPin className="text-2xl" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1F150C]">
                FindBack
              </h2>

              <p className="text-xs font-medium capitalize text-[#786D62]">
                {roleLoading
                  ? "Loading..."
                  : `${userRole} Dashboard`}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#1F150C] hover:bg-[#EDE8DC] lg:hidden"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
          {roleLoading ? (
            <p className="px-3 py-3 text-sm font-medium text-[#786D62]">
              Loading menu...
            </p>
          ) : (
            navItems.map((item) => {
              const Icon = item.icon;
              const active = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active
                      ? "bg-[#412D15] text-white shadow-md"
                      : "text-[#675C50] hover:bg-[#E1DCC9]/70 hover:text-[#1F150C]"
                    }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              );
            })
          )}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto border-t border-[#D8CFBC] p-4">
          <div className="rounded-2xl bg-[#EDE8DC] p-4">
            <p className="text-sm font-semibold text-[#1F150C]">
              FindBack Account
            </p>

            <p className="mt-1 text-xs leading-5 text-[#786D62]">
              Manage your lost and found reports and account
              information.
            </p>

            <Link
              href="/"
              onClick={closeSidebar}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#CBBFA8] bg-white text-sm font-semibold text-[#412D15] transition hover:bg-[#F7F3EA]"
            >
              <FiHome className="text-lg" />
              Back to Home
            </Link>

            <button
              onClick={handleLogout}
              type="button"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#412D15] text-sm font-semibold text-white transition hover:bg-[#1F150C]"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Dashboard content */}
      <main className="min-w-0 p-4 md:p-6 lg:ml-72 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;