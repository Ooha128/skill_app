import React from 'react';

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl,
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center"></div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <a href={linkUrl}  className="font-bold text-blue-600 hover:text-rose-500 underline">
          {linkName}
        </a>
      </p>
    </div>
  );
}
