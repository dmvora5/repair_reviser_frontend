"use client";

import React from "react";
import { useGetPrivacyAndTermsQuery } from "@/redux/apis/usersApis";

// Decode HTML safely
const decodeHtml = (html: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const Page = () => {
  const { data, isLoading, error } = useGetPrivacyAndTermsQuery({});

  // Get decoded privacy text
  const decodedPrivacyText = (data as any)?.privacy_text
    ? decodeHtml((data as any).privacy_text)
    : "";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-white">Privacy Policy</h1>

      {isLoading && <p>Loading...</p>}
      {typeof error === "object" && error !== null && (
        <p className="text-red-500">Failed to load FAQ data.</p>
      )}

      {!isLoading && !error && (
        <div
          className="prose prose-sm text-white"
          dangerouslySetInnerHTML={{ __html: decodedPrivacyText }}
        />
      )}
    </div>
  );
};

export default Page;
