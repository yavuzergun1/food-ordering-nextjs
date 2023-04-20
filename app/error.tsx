"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="container max-w-3xl mx-auto my-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Error </h1>
          <p className="mb-4">
            Oops! Something went wrong on our end. Please try again later.
          </p>
          <Link href="/">
            <a className="text-blue-500 hover:text-blue-700">Go back home</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
