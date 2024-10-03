import Image from "next/image";
import Link from "next/link";
import '../app/globals.css'; // Ensure the correct path

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4 py-10">
      <Image
        src="/assets/404-computer.svg"
        alt="Page Not Found"
        width={400}
        height={300}
      />
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mt-2">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
      {"  We couldn't find the page you were looking for. It might have been removed, or the URL could be incorrect."}
      </p>
      <Link 
        href="/" 
        className="mt-6 inline-block px-6 py-3 bg-main-500 text-white rounded-lg shadow-lg transition duration-200 hover:bg-main-600 focus:outline-none focus:ring-2 focus:ring-main-400"
      >
        Go Back Home
      </Link>
    </div>
  );
}