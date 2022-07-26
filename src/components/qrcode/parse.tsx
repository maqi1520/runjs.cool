import { useState } from "react";
import qrcodeParser from "qrcode-parser";
import { CopyButton, Button } from "../Button";
import { CodeBlock } from "../CodeBlock";
import { ErrorMessage } from "../ErrorMessage";
import { Column } from "../TwoColumns";

export default function QrcodeParserPage() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const resetState = () => {
    setError("");
    setResult("");
    setImageSrc("");
  };

  const handleChange = async (e: any) => {
    resetState();
    const file = e.target.files[0];

    try {
      const qrcodeContent = await qrcodeParser(file);
      setResult(qrcodeContent);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result.toString());
      };
      reader.onerror = (err) => {
        alert(err);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const getClipboardImageContent = async () => {
    resetState();

    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        if (!clipboardItem.types.includes("image/png")) {
          throw new Error("Clipboard contains non-image data.");
        }

        const blob = await clipboardItem.getType("image/png");
        const url = URL.createObjectURL(blob);
        const qrcodeContent = await qrcodeParser(url);

        setResult(qrcodeContent);
        setImageSrc(url);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Column
      title="二维码解析"
      renderRight={() => (
        <Button onClick={getClipboardImageContent}>粘贴图片</Button>
      )}
    >
      <div className="p-3">
        <ErrorMessage className="mb-2" message={error} />
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="input-file"
          />
        </label>
        {imageSrc && (
          <div className="mt-5">
            <img className="border" src={imageSrc} />
          </div>
        )}

        {result && (
          <div className="mt-2 flex">
            <div className="flex-auto">
              <CodeBlock code={result} />
            </div>
            <div className="flex-none">
              <CopyButton className=" ml-2" getValue={() => result} />
            </div>
          </div>
        )}
      </div>
    </Column>
  );
}
