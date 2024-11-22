import Head from "next/head";
import { useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";

export default function Generate() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  const downloadQRCode = () => {
    const svgElement = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "QRCode.png";
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <>
      <Head>
        <title>Generate QR</title>
        <meta name="description" content="Modern QR Code Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-t from-gray-900 via-black to-gray-800 text-gray-200">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Generate QR</h1>
          <p className="text-gray-400 mb-6 text-lg">Create and download your QR Code!</p>
          {qrCodeValue && (
            <div className="bg-white p-4 rounded-md mb-6 shadow-lg">
              <QRCode value={qrCodeValue} size={180} />
            </div>
          )}
          <input
            className="border border-gray-600 bg-gray-700 text-gray-200 p-3 rounded-md mb-4 w-80"
            onChange={(e) => setQrCodeValue(e.target.value)}
            placeholder="Enter text for QR code"
          />
          {qrCodeValue && (
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition-all mb-4"
              onClick={downloadQRCode}
            >
              Save QR Code
            </button>
          )}
          <Link
            href={`/`}
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
