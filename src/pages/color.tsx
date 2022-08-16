import React, { useState } from "react";
import { Layout } from "../components/Layout";
import chroma from "chroma-js";
import clsx from "clsx";

function TailwindTab({ grays, colors, tint, shade }) {
  return (
    <div className="overflow-x-scroll">
      {Object.keys(grays).map((key) => (
        <span key={key} className="whitespace-no-wrap">
          {`'${key}': '${grays[key].value.hex()}'`},
          <br />
        </span>
      ))}
      <br />

      {Object.keys(colors).map((key) => {
        const color = colors[key];

        return (
          <span key={key} className="whitespace-no-wrap">
            {`'${key}-light': '${tint(color.value).hex()}`},
            <br />
            {`'${key}': '${color.value.hex()}`},
            <br />
            {`'${key}-dark': '${shade(color.value).hex()}`},
            <br />
            <br />
          </span>
        );
      })}
    </div>
  );
}

function SassTab({ grays, colors, tint, shade }) {
  return (
    <div className="overflow-x-scroll">
      {Object.keys(grays).map((key) => (
        <span key={key} className="whitespace-no-wrap">
          {`$${key}: ${grays[key].value.hex()}`}
          <br />
        </span>
      ))}
      <br />

      {Object.keys(colors).map((key) => {
        const color = colors[key];

        return (
          <span key={key} className="whitespace-no-wrap">
            {`$${key}-light: ${tint(color.value).hex()}`}
            <br />
            {`$${key}: ${color.value.hex()}`}
            <br />
            {`$${key}-dark: ${shade(color.value).hex()}`}
            <br />
            <br />
          </span>
        );
      })}
    </div>
  );
}

function ScssTab({ grays, colors, tint, shade }) {
  return (
    <div className="overflow-x-scroll">
      {Object.keys(grays).map((key) => (
        <span key={key} className="whitespace-no-wrap">
          {`$${key}: ${grays[key].value.hex()}`};
          <br />
        </span>
      ))}
      <br />

      {Object.keys(colors).map((key) => {
        const color = colors[key];

        return (
          <span key={key} className="whitespace-no-wrap">
            {`$${key}-light: ${tint(color.value).hex()}`};
            <br />
            {`$${key}: ${color.value.hex()}`};
            <br />
            {`$${key}-dark: ${shade(color.value).hex()}`};
            <br />
            <br />
          </span>
        );
      })}
    </div>
  );
}

function LessTab({ grays, colors, tint, shade }) {
  return (
    <div className="overflow-x-scroll">
      {Object.keys(grays).map((key) => (
        <span key={key} className="whitespace-no-wrap">
          {`@${key}: ${grays[key].value.hex()}`};
          <br />
        </span>
      ))}
      <br />

      {Object.keys(colors).map((key) => {
        const color = colors[key];

        return (
          <span key={key} className="whitespace-no-wrap">
            {`@${key}-light: ${tint(color.value).hex()}`};
            <br />
            {`@${key}: ${color.value.hex()}`};
            <br />
            {`@${key}-dark: ${shade(color.value).hex()}`};
            <br />
            <br />
          </span>
        );
      })}
    </div>
  );
}

const tabs = [
  {
    id: "tailwind",
    title: "Tailwind",
  },
  {
    id: "sass",
    title: "SASS",
  },
  {
    id: "scss",
    title: "SCSS",
  },
  {
    id: "less",
    title: "Less",
  },
];

const getRandomColor = () => {
  return chroma.random();
};

export default function QrcodePage() {
  const [colorInputValue, setColorInputValue] = useState(getRandomColor());
  const [activeTab, setActiveTabState] = useState("tailwind");

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    localStorage.setItem("activeTab", tab);
  };

  const tint = (hex) => {
    return chroma.mix("#fff", hex, 0.25, "lab");
  };

  const shade = (hex) => {
    return chroma.mix("#000", hex, 0.5, "lab");
  };

  let brand = chroma("#38bdf8");

  if (chroma.valid(colorInputValue)) {
    brand = chroma(colorInputValue);
  }

  const colors = {
    brand: {
      name: "Brand",
      value: brand,
    },
    cta: {
      name: "CTA",
      value: brand.set("hsl.h", "+150"),
    },
    info: {
      name: "Info",
      value: chroma.mix("#3df", brand, 0.2, "lab"),
    },
    warning: {
      name: "Warning",
      value: chroma.mix("#fd0", brand, 0.2, "lab"),
    },
    success: {
      name: "Success",
      value: chroma.mix("#3e4", brand, 0.2, "lab"),
    },
    danger: {
      name: "Danger",
      value: chroma.mix("#f34", brand, 0.2, "lab"),
    },
  };

  const grays = {
    white: {
      name: "White",
      value: chroma("#fff"),
    },
    "gray-lightest": {
      name: "gray Lightest",
      value: chroma.mix("#fafafa", brand, 0.01, "lab"),
    },
    "gray-lighter": {
      name: "gray Lighter",
      value: chroma.mix("#e6e6e6", brand, 0.01, "lab"),
    },
    "gray-light": {
      name: "gray Light",
      value: chroma.mix("#d2d2d2", brand, 0.01, "lab"),
    },
    gray: {
      name: "gray",
      value: chroma.mix("#bfbfbf", brand, 0.01, "lab"),
    },
    "gray-dark": {
      name: "gray Dark",
      value: chroma.mix("#979797", brand, 0.01, "lab"),
    },
    "gray-darker": {
      name: "gray Darker",
      value: chroma.mix("#6f6f6f", brand, 0.01, "lab"),
    },
    "gray-darkest": {
      name: "gray Darkest",
      value: chroma.mix("#484848", brand, 0.01, "lab"),
    },
    black: {
      name: "Black",
      value: chroma.mix("#202020", brand, 0.01, "lab"),
    },
  };

  return (
    <Layout>
      <h1 className="px-4 my-12 text-4xl leading-tight text-center">
        Color Scheme Generator
      </h1>

      <label className="block max-w-lg px-4 mx-auto mb-12">
        <span className="text-lg">Brand Color</span>

        <div className="flex w-full">
          <input
            type="text"
            autoComplete="off"
            autoFocus
            onChange={(e) => setColorInputValue(e.target.value)}
            value={colorInputValue}
            className="input flex-auto"
            placeholder="brand"
          />

          <button
            type="button"
            className="ml-3 bg-transparent border-blue-500 border rounded px-4 py-2 text-sm inline-flex items-center text-blue-500 active:bg-blue-500 active:text-white"
            title="Randomize"
            onClick={() => {
              setColorInputValue(getRandomColor());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </label>

      <section className="container px-4 mx-auto mb-12">
        <div className="flex flex-wrap items-start justify-between -mx-4 md:flex-no-wrap">
          {Object.keys(colors).map((key) => {
            const color = colors[key];
            return (
              <div key={key} className="w-1/2 p-4 md:1/6 sm:w-1/3">
                <span>{color.name}</span>
                <div className="flex flex-col h-32 overflow-hidden rounded">
                  <span
                    style={{ backgroundColor: tint(color.value.hex()).hex() }}
                    className="h-6"
                  ></span>
                  <span
                    style={{ backgroundColor: color.value.hex() }}
                    className="flex-1"
                  ></span>
                  <span
                    style={{ backgroundColor: shade(color.value.hex()).hex() }}
                    className="h-6"
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container px-4 mx-auto mb-12">
        <span>Grays</span>

        <div className="flex flex-wrap items-center justify-center overflow-hidden rounded md:flex-no-wrap">
          {Object.keys(grays).map((key, index) => (
            <div
              key={key}
              style={{ backgroundColor: grays[key].value.hex() }}
              className="w-1/3 h-32 md:flex-1"
            ></div>
          ))}
        </div>
      </section>

      <section className="container px-4 mx-auto mb-12">
        <div className="flex flex-wrap bg-blue-500/20 px-10">
          {tabs.map((tab) => (
            <span
              key={tab.id}
              className={clsx(
                "px-2 py-1 mr-2 text-sm rounded-t cursor-pointer sm:px-4 sm:py-2 sm:text-base",
                {
                  "bg-white dark:bg-neutral-900/75 text-blue-500":
                    activeTab === tab.id,
                }
              )}
              role="tab"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </span>
          ))}
        </div>

        <div
          tab-index="0"
          id="output"
          className={clsx(
            "px-4 pt-8 pb-4 text-sm leading-tight  bg-white dark:bg-neutral-900/75 rounded-b rounded-tr",
            {
              "rounded-t": activeTab !== "tailwind",
            }
          )}
        >
          {activeTab === "tailwind" && (
            <TailwindTab
              grays={grays}
              colors={colors}
              tint={tint}
              shade={shade}
            />
          )}

          {activeTab === "sass" && (
            <SassTab grays={grays} colors={colors} tint={tint} shade={shade} />
          )}

          {activeTab === "scss" && (
            <ScssTab grays={grays} colors={colors} tint={tint} shade={shade} />
          )}

          {activeTab === "less" && (
            <LessTab grays={grays} colors={colors} tint={tint} shade={shade} />
          )}
        </div>
      </section>
    </Layout>
  );
}
