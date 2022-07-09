import React from "react";
import { Sidebar } from "./Sidebar";
import Head from "next/head";
import { tools } from "@/tools";
import { useRouter } from "next/router";

export const Layout: React.FC<{ title?: string }> = ({ children, title }) => {
  const router = useRouter();
  const tool = React.useMemo(
    () => tools.find((t) => t.link === router.asPath),
    [router.asPath]
  );

  const documentTitle = title || (tool && tool.name);

  return (
    <>
      <Head>
        <title>
          {documentTitle ? `${documentTitle} - 前端工具箱` : `前端工具箱`}
        </title>
        <meta
          name="description"
          content="丰富的前端工具，前端工程师开发小帮手!"
        />
      </Head>
      <div className="pt-16 md:pt-0  w-full min-h-screen flex text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Sidebar />
        <main className="flex-1 md:ml-80 min-h-screen">{children}</main>
      </div>
    </>
  );
};
