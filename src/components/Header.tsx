import React from "react";
import LightIcon from "@/components/Icon/LightIcon";
import DarkIcon from "@/components/Icon/DarkIcon";
import LogoIcon from "@/components/Icon/LogoIcon";
import { toggleTheme } from "@/utils/themes";
import Link from "next/link";

import dynamic from "next/dynamic";
const LoginBtn = dynamic(() => import("@/components/LoginBtn"), {
  ssr: false,
});

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="border-b bg-white z-10  dark:border-neutral-50/[0.2] dark:bg-neutral-900">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto mb-4 md:mb-0">
          <Link href="/html-to-markdown">
            <a className="mr-5 hover:text-blue-500">工具</a>
          </Link>
          <Link href="/interview">
            <a className="mr-5 hover:text-blue-500">刷题</a>
          </Link>
          <a
            href="https://editor.runjs.cool/"
            target="_blank"
            className="mr-5 hover:text-blue-500"
          >
            写作
          </a>
          <a
            href="https://ppt.runjs.cool/"
            target="_blank"
            className="mr-5 hover:text-blue-500"
          >
            幻灯片
          </a>
          <a
            href="https://cv.runjs.cool/"
            target="_blank"
            className="mr-5 hover:text-blue-500"
          >
            写简历
          </a>
          <a
            href="https://excalidraw.com/"
            target="_blank"
            className="hover:text-blue-500"
          >
            画图
          </a>
        </nav>
        <Link href="/">
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
            <LogoIcon className="w-7 h-7" />
            <span className="ml-3 text-xl">前端工具箱</span>
          </a>
        </Link>

        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
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
          <LoginBtn />
        </div>
      </div>
    </header>
  );
}
