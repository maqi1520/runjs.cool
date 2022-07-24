import React from "react";
import Link from "next/link";
import { categories, getLevelStar } from "@/utils/question";
import { Question, Tag } from "@/types";
interface Props {
  question: Question;
  query?: any;
  tagmap: any;
}

export default function InterviewItem({ question, query = {}, tagmap }: Props) {
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
            <span className="text-orange-500" role={"level:" + question.level}>
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
}
