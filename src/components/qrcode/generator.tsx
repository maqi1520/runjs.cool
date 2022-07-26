import React from "react";
import QRCode from "qrcode";
import { ErrorMessage } from "../ErrorMessage";
import { Button } from "../Button";
import SampleIcon from "@/components/Icon/SampleIcon";
import { Column } from "../TwoColumns";

type Item = {
  img: string;
  value: string;
};

export default function QrcodePage() {
  const [list, setList] = React.useState<Item[]>([]);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");

  const handleGenerator = async () => {
    if (!input) {
      return;
    }
    try {
      const dataURL = await QRCode.toDataURL(input, {
        width: 300,
      });
      //setQrcode(dataURL);
      setList((prev) => [...prev, { img: dataURL, value: input }]);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleRemove = (index: number) => {
    setList((prev) => {
      let list = [...prev];
      list.splice(index, 1);
      return list;
    });
  };

  return (
    <Column
      title="生成二维码"
      renderRight={() => (
        <Button onClick={handleGenerator}>
          <SampleIcon className="w-5 h-5" />
          生成
        </Button>
      )}
    >
      <div className="p-3">
        <textarea
          rows={5}
          id="input-el"
          className="w-full input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <ErrorMessage className="mb-2" message={error} />
        {list.map((item, index) => {
          return (
            <div className="flex mt-2">
              <img
                className="max-w-full w-[150px] h-[150px] border flex-none"
                src={item.img}
              />
              <div className="flex-auto ml-2">{item.value}</div>
              <svg
                onClick={() => handleRemove(index)}
                className="w-5 h-5 text-blue-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </Column>
  );
}
