"use client";
import { useState } from "react";

export default function Form() {
  const [inputText, setInputText] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGeneratedContent("");

    let textToSummarize = inputText;

    try {
      const summarizeResponse = await fetch("/api/Summerize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      const summarizeData = await summarizeResponse.json();

      if (summarizeResponse.ok) {
        setGeneratedContent(summarizeData.content);
      } else {
        console.error("Error:", summarizeData.error);
        setError(summarizeData.error || "Something went wrong while summarizing.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text manually"
          className="textarea"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="submit-btn"
        >
          {loading ? "Processing..." : "Summarize"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      {generatedContent && (
        <div className="result">
          <h3>Summary:</h3>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
}
