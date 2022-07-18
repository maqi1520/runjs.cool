import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useScrollLock } from "../hooks/useScrollLock";
import { tools } from "@/tools";
import LightIcon from "@/components/Icon/LightIcon";
import DarkIcon from "@/components/Icon/DarkIcon";
import LogoIcon from "@/components/Icon/LogoIcon";
import { toggleTheme } from "@/utils/themes";

export const Sidebar = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useScrollLock(showSidebar);

  return (
    <div className="fixed h-auto md:h-screen top-0 w-full md:w-64 border-r border-neutral-900/10 dark:border-neutral-50/[0.06] bg-white backdrop-blur dark:bg-neutral-900/75">
      <header className="px-5 h-16 fixed z-50 right-0 left-0 top-0 flex items-center justify-between  md:relative md:px-3 border-b dark:border-neutral-800">
        <div className="flex items-center h-full">
          <h1 className="text-xl font-medium">
            <Link href="/">
              <a className="flex space-x-3 items-center px-1">
                <LogoIcon className="w-8 h-8" />
                <span>前端工具箱</span>
              </a>
            </Link>
          </h1>
        </div>
        <div className="flex space-x-3">
          <div className="block dark:hidden">
            <button
              type="button"
              aria-label="Use Dark Mode"
              onClick={toggleTheme}
              className="flex items-center h-full pr-2"
            >
              {DarkIcon}
            </button>
          </div>
          <div className="hidden dark:block">
            <button
              type="button"
              aria-label="Use Light Mode"
              onClick={toggleTheme}
              className="flex items-center h-full pr-2"
            >
              {LightIcon}
            </button>
          </div>
          <button
            type="button"
            role="menu"
            className="md:hidden block h-full"
            onClick={() => setShowSidebar((show) => !show)}
          >
            {showSidebar ? (
              <svg width="2em" height="2em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
                ></path>
              </svg>
            ) : (
              <svg width="2em" height="2em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </header>
      <div
        className={clsx(
          `backdrop-blur-lg fixed h-screen md:static md:block top-0 pt-16 md:pt-0 bottom-0 left-0 right-0 bg-white z-40 dark:bg-neutral-900/75`,
          {
            hidden: !showSidebar,
          }
        )}
      >
        <div className="py-3">
          {tools.map((tool) => {
            const isActive = router.pathname === tool.link;
            return (
              <Link href={tool.link} key={tool.link}>
                <a
                  className={clsx(`px-4 py-3 flex relative`, {
                    "text-blue-500 bg-blue-500/10 after:absolute after:-right-px after:top-0  after:w-1 after:bottom-0 after:bg-blue-500":
                      isActive,
                  })}
                >
                  {tool.name}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
