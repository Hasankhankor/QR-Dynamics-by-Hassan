import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function Scan() {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (result, error) => {
    if (!!result) {
      setData(result?.text);
      setShowModal(true);
      qrRef.current.stop();
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.reload();
  };

  const handleOK = async () => {
    await axios.post(`/api/postData`, { data });
    router.reload();
  };

  const handleSave = () => {
    const blob = new Blob([data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "QRCodeData.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>QR Scan</title>
        <meta name="description" content="Modern QR Scanner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center h-screen bg-gradient-to-t from-gray-900 via-black to-gray-800 text-gray-200">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-6 text-white">QR Scanner</h1>
          <p className="text-gray-400 mb-6 text-lg">Scan and save your QR code data!</p>
          <div>
            <QrReader
              className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px] border-4 border-gray-700 rounded-md"
              onResult={handleScan}
              constraints={{ facingMode: "environment" }}
              ref={qrRef}
            />
          </div>
          <Link
            href={`/`}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Back to Home
          </Link>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-gray-800 text-white rounded-lg p-6 w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-4">Scanned Data:</h2>
                <p className="mb-6 text-gray-300">{data}</p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={handleOK}
                  >
                    Save to Server
                  </button>
                  <button
                    className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600"
                    onClick={handleSave}
                  >
                    Save to File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
