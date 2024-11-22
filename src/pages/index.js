import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>QR Dynamics by Hassan</title>
        <meta name="description" content="Modern QR Code Tools - Scan and Generate QR Codes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-t from-gray-900 via-black to-gray-800 text-gray-200">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-white mb-4">QR Dynamics by Hassan</h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Seamlessly scan or generate QR codes. Choose an action below to get started!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href={`/scan`}
            className="group relative flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-purple-500 opacity-20 group-hover:opacity-30"></div>
            <img src="/scan-icon.svg" alt="Scan QR Code" className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-semibold text-white">Scan QR Code</h2>
          </Link>
          <Link
            href={`/generate`}
            className="group relative flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-600 to-teal-500 opacity-20 group-hover:opacity-30"></div>
            <img src="/generate-icon.svg" alt="Generate QR Code" className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-semibold text-white">Generate QR Code</h2>
          </Link>
        </div>
      </main>
    </>
  );
}
