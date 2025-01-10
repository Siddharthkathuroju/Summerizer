"use client";
import { useState } from "react";

export default function Feed() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
    } else {
      setError("");
      setFile(uploadedFile);
    }
  };

  const handleExtractText = async () => {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setExtractedText("");

    try {
      const response = await fetch("/api/testing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to extract text: ${response.statusText}`);
      }

      const data = await response.json();
      setExtractedText(data.extractedText);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to extract text. Please check the file and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-container">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="file-input"
        disabled={loading}
      />
      <button
        type="button"
        onClick={handleExtractText}
        disabled={loading || !file}
        className="extract-btn"
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {extractedText && (
        <div className="extracted-text">
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
