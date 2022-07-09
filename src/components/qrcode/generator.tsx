import React from "react";
import QRCode from "qrcode";
import { ErrorMessage } from "../ErrorMessage";
import { Button, CopyButton } from "../Button";
import { Column } from "../TwoColumns";

export default function QrcodePage() {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [qrcode, setQrcode] = React.useState<string | null>(null);

  const handleInputChange = async (e: any) => {
    setInput(e.target.value);
    try {
      const dataURL = await QRCode.toDataURL(e.target.value, {
        width: 300,
      });
      setQrcode(dataURL);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Column
      title="生成二维码"
      renderRight={() => <CopyButton getValue={() => input} />}
    >
      <div className="p-3">
        <ErrorMessage className="mb-2" message={error} />
        <textarea
          rows={10}
          id="input-el"
          className="w-full input"
          value={input}
          onChange={handleInputChange}
        ></textarea>
        {qrcode && <img className="max-w-full" src={qrcode} />}
      </div>
    </Column>
  );
}
