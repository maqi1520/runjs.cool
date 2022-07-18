import React from "react";
import { Sidebar } from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
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
      <div className="pt-16 md:pt-0  w-full min-h-screen flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 min-h-screen">{children}</main>
      </div>
    </>
  );
};

export const SampleLayout: React.FC<{ title?: string; desc?: string }> = ({
  children,
  title,
  desc,
}) => {
  const documentTitle = title;

  return (
    <>
      <Head>
        <title>
          {documentTitle ? `${documentTitle} - 前端工具箱` : `前端工具箱`}
        </title>
        <meta
          name="description"
          content={desc || "丰富的前端工具，前端工程师开发小帮手!"}
        />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};
