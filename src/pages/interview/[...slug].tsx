import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SampleLayout } from "@/components/Layout";
import { marked } from "marked";
import clsx from "clsx";
import dynamic from "next/dynamic";

const HighlightCode = dynamic(() => import("@/components/HighlightCode"), {
  ssr: false,
});

interface Opts {
  isMulti: string;
  options: string[];
  answer: string[];
}

export interface Question {
  _id: string;
  category: string;
  title: string;
  desc: string;
  options?: string;
  explanation: string;
  level: number;
  tagId: number;
}

export interface Tag {
  id: number;
  tagName: string;
  image: string;
}

type JSONResponse = {
  next?: Question;
  prev?: Question;
  data: Question;
  tags: Tag[];
};

export default function InterviewDetail({ next, prev, data }: JSONResponse) {
  const [visible, setVisible] = useState(false);
  const categories = { Choice: "选择题", QA: "问答题" };
  const getLevelStar = (level) => {
    var str = "";
    var roundLevel = Math.floor(level);
    for (var i = 0; i < roundLevel; i++) {
      str += "★";
    }

    if (level - roundLevel > 0) str += "☆";
    return str;
  };

  const isChoice = !!data.options;
  const opts: Opts = isChoice ? JSON.parse(data.options) : {};
  const options = opts.options;
  const isMulti = opts.isMulti;
  const codes = ["A", "B", "C", "D", "E", "F", "G"];
  const router = useRouter();

  const query = router.query;

  return (
    <>
      <SampleLayout desc={data.desc} title={`${data.title} - 前端面试题`}>
        <article className="container max-w-5xl p-5 mx-auto">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl ">
            {data.title}
          </h1>
          <div className="mt-12 prose max-w-none dark:prose-dark">
            <HighlightCode html={data.desc}></HighlightCode>
            <div className="mt-3">
              <span className="px-3 py-1 bg-blue-500 border border-blue-500  rounded text-white mr-3">
                {categories[data.category]}
              </span>
              <span className="font-semibold">难度：</span>
              <span
                className="text-orange-500 ml-1"
                role={"level:" + data.level}
              >
                {getLevelStar(data.level)}
              </span>
            </div>

            {options && (
              <div className="py-2 mt-2">
                <div className="font-medium">
                  <span>本题为</span>
                  <span>{isMulti ? "多选题" : "单选题"}</span>
                </div>
                <div className="space-y-3 mt-2">
                  {options.map((item, index) => (
                    <label className="flex item-center" key={index}>
                      {!isMulti ? (
                        <input
                          className="accent-blue-500"
                          type="radio"
                          value={item}
                          name="checkbox"
                        />
                      ) : (
                        <input
                          className="accent-blue-500"
                          type="checkbox"
                          value={item}
                          name="checkbox"
                        />
                      )}
                      <span className="ml-5">
                        <span className="mr-2 font-semibold">
                          {codes[index]}:
                        </span>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div
              className={clsx(
                "py-10 mt-10 flex justify-center border-t dark:border-neutral-500",
                {
                  hidden: visible,
                }
              )}
            >
              <button
                onClick={() => {
                  setVisible(true);
                }}
                className="px-6 py-3 border border-blue-500 bg-blue-500  font-semibold text-white rounded mx-auto text-xl"
              >
                查看答案
              </button>
            </div>

            <div className={clsx({ hidden: !visible })}>
              <h2 className="border-b dark:border-neutral-500 p-1">参考答案</h2>
              {opts.answer &&
                opts.answer.map((item, index) => (
                  <div className="mt-1" key={index}>
                    <span className="mr-5 font-semibold">{codes[item]}:</span>
                    <span>{opts.options[item]}</span>
                  </div>
                ))}
              <HighlightCode html={data.explanation}></HighlightCode>
            </div>
          </div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev ? (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={{
                      pathname: `/interview/${prev._id}`,
                      query: JSON.parse(
                        JSON.stringify({
                          ...query,
                          page: undefined,
                          slug: undefined,
                        })
                      ),
                    }}
                  >
                    <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      &larr; 上一题
                    </a>
                  </Link>
                </div>
              ) : (
                <div />
              )}
              {next ? (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={{
                      pathname: `/interview/${next._id}`,
                      query: JSON.parse(
                        JSON.stringify({
                          ...query,
                          page: undefined,
                          slug: undefined,
                        })
                      ),
                    }}
                  >
                    <a className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      下一题 &rarr;
                    </a>
                  </Link>
                </div>
              ) : (
                <div />
              )}
            </div>
          </footer>
        </article>
      </SampleLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params;
  const { q = "", tagid } = context.query;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "post",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      action: "detail",
      id: slug[0],
      title: q,
      tagid,
    }),
  });
  const { data, next = null, prev = null }: JSONResponse = await res.json();

  return {
    props: {
      data: {
        ...data,
        desc: marked.parse(data.desc || ""),
        explanation: marked.parse(data.explanation || ""),
      },
      next,
      prev,
    }, // will be passed to the page component as props
  };
}
