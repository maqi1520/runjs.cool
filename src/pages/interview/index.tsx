import React from "react";
import { GetServerSidePropsContext } from "next";
import { SampleLayout } from "@/components/Layout";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

export interface Question {
  _id: string;
  category: string;
  title: string;
  desc: string;
  level: number;
  tagId: number;
}

export interface Tag {
  id: number;
  tagName: string;
  image: string;
}

type JSONResponse = {
  hasNext: boolean;
  q: string;
  page: number;
  data: Question[];
  tags: Tag[];
};

export default function Interview({
  data,
  tags,
  q,
  page,
  hasNext,
}: JSONResponse) {
  console.log(page);

  let tagmap = {};
  for (const tag of tags) {
    tagmap[tag.id] = tag.tagName;
  }
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

  const router = useRouter();

  const query = router.query;

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      router.push({
        pathname: "/interview",
        query: {
          ...query,
          q: e.target.value,
          page: 1,
        },
      });
    }
  };

  return (
    <SampleLayout>
      <section className="text-neutral-600 dark:text-slate-200 body-font overflow-hidden">
        <div className="container max-w-5xl px-5 py-16 mx-auto">
          <div className="relative">
            <span className="sr-only">Search</span>
            <input
              defaultValue={q}
              onKeyDown={onKeyDown}
              placeholder="搜一搜"
              type="text"
              className="border dark:border-neutral-50/[0.2] focus:outline outline-2 outline-blue-500 rounded  w-full px-12 py-2 pr-3 dark:bg-transparent"
            />
            <svg
              className="w-6 h-6 absolute left-3 top-2 text-neutral-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-10">
            {tags.map((tag) => {
              return (
                <Link
                  key={tag.id}
                  href={{
                    pathname: "/interview",
                    query: {
                      ...query,
                      tagid: tag.id,
                      page: 1,
                    },
                  }}
                >
                  <a
                    className={clsx(
                      "flex flex-col md:flex-row items-center border dark:border-neutral-50/[0.2] p-2 rounded cursor-pointer",
                      {
                        "border-blue-500 dark:border-blue-500":
                          tag.id === +query.tagid,
                      }
                    )}
                  >
                    <img
                      src={tag.image}
                      alt={tag.tagName + "ICON"}
                      className="w-10 h-10 md:mr-2"
                    />
                    <span>{tag.tagName}</span>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {data.map((question) => {
              return (
                <Link
                  key={question._id}
                  href={{
                    pathname: `/interview/${question._id}`,
                    query: JSON.parse(
                      JSON.stringify({
                        ...query,
                        page: undefined,
                      })
                    ),
                  }}
                >
                  <a className="py-6 md:py-8 flex flex-col md:flex-row flex-wrap md:flex-nowrap group">
                    <div className="md:w-48 md:mb-0 mb-2 flex-shrink-0 flex justify-between md:flex-col">
                      <span className="font-semibold title-font text-neutral-700 dark:text-slate-400">
                        {tagmap[question.tagId]}
                      </span>

                      <span className="mt-1 text-neutral-500 dark:text-slate-300 text-sm">
                        {categories[question.category]}
                      </span>
                    </div>
                    <div className="md:flex-grow relative">
                      <h2 className="text-xl md:text-2xl font-medium text-neutral-900  dark:text-slate-200 title-font mb-2">
                        {question.title}
                      </h2>
                      <span className="mt-1 text-neutral-500  dark:text-slate-400 text-sm">
                        难度：
                        <span
                          className="text-orange-500"
                          role={"level:" + question.level}
                        >
                          {getLevelStar(question.level)}
                        </span>
                      </span>

                      <span className="text-blue-500 absolute right-0 top-1/2 -mt-[16px] opacity-0 -translate-x-6 ease-out duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <svg
                          className="w-10 h-10 "
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between py-10 border-t border-neutral-100 dark:border-neutral-700">
            <Link
              href={{
                pathname: "/interview",
                query: {
                  ...query,
                  page: page - 1,
                },
              }}
            >
              <a>
                <Button disabled={page === 1}>上一页</Button>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/interview",
                query: {
                  ...query,
                  page: page + 1,
                },
              }}
            >
              <a>
                <Button disabled={hasNext === false}>下一页</Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </SampleLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { q = "", tagid, page = 1 } = context.query;

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "post",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      action: "list",
      page,
      title: q,
      tagid,
    }),
  });

  const { data, tags = null, hasNext }: JSONResponse = await res.json();

  return {
    props: {
      data,
      tags,
      page: +page,
      hasNext,
      q,
    }, // will be passed to the page component as props
  };
}
