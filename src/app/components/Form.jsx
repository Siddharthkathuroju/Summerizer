"use client";
import { useState } from 'react';

export default function Form() {
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/Summerize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'summarize', text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedContent(data.content);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
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
          placeholder="Enter text to generate content"
          className="textarea"
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Generating...' : 'Summarize Content'}
        </button>
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
