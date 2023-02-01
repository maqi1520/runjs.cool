import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="bg-neutral-100 border-t dark:border-neutral-50/[0.2] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
      <div className="container  mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className=" text-sm text-center sm:text-left">
          丰富的前端工具，前端工程师开发小帮手!
          <a href="https://www.maqib.cn/" className="ml-2" target="_blank">
            @maqibin
          </a>
        </p>

        <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-sm">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            浙ICP备17007919号-2
          </a>
          © 2023 runjs.cool
        </span>
      </div>
    </div>
  );
}
