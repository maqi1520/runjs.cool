import { SampleLayout } from "../components/Layout";
import { data } from "@/navigations";
import { useEffect } from "react";
import { icons } from "@/components/Icon/NavIcon";

const handleScroll = () => {
  for (const item of Array.from(document.querySelectorAll(".js-category"))) {
    if (
      item.getBoundingClientRect().y < 100 &&
      item.getBoundingClientRect().y >= 0
    ) {
      const current = document.querySelector(".js-menu-item-" + item.id);
      if (!current.className.includes("active")) {
        document.querySelectorAll(`.js-menu-item`).forEach((li) => {
          if (li.classList.contains("active")) {
            li.classList.remove("active");
          }
        });
        current.classList.add("active");
      }
      break;
    }
  }
};

export default function HomePage() {
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (id) => {
    document.querySelector(`.js-category-${id}`).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <SampleLayout>
      <div className="container mx-auto p-6 ">
        <ul className="w-40 float-left space-y-2 border dark:border-neutral-50/[0.2] rounded-lg p-2 sticky top-4 left-0">
          {data.map((category) => {
            return (
              <li
                className={`js-menu-item js-menu-item-${category.id}`}
                onClick={() => handleClick(category.id)}
                key={category.id}
              >
                <div className="flex items-center">
                  <span className="w-5 h-5 inline-block nav-icon mr-1">
                    {icons[category.icon]}
                  </span>
                  <span> {category.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="pl-44">
          {data.map((category) => {
            return (
              <li
                className={`js-category js-category-${category.id}`}
                id={"" + category.id}
                key={category.id}
              >
                <div className="text-base pt-5 pb-2">{category.label}</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols- gap-3">
                  {category.children.map((nav, index) => {
                    return (
                      <li
                        className="border dark:border-neutral-50/[0.2] rounded-lg p-5 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500"
                        key={index}
                      >
                        <a
                          href={nav.siteUrl}
                          className="block"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <div className="flex items-center">
                            <span className="flex-auto">{nav.title}</span>
                          </div>
                          <div className="mt-1 text-neutral-500 dark:text-slate-300 text-xs truncate normal-case">
                            {nav.desc}
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </SampleLayout>
  );
}
