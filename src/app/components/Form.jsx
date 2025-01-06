"use client";
import { useState } from 'react';

export default function Form() {
  const [inputText, setInputText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isFileUploaded = !!file;
    const endpoint = isFileUploaded ? '/api/text/' : '/api/Summerize/';

    try {
      const response = isFileUploaded
        ? await fetch(endpoint, {
            method: 'POST',
            body: (() => {
              const formData = new FormData();
              formData.append('file', file);
              return formData;
            })(),
          })
        : await fetch(endpoint, {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to generate content"
          className="textarea"
          disabled={loading || !!file} // Disable textarea when a file is uploaded
        />
        <p className="text-sm text-gray-500">OR</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading || (!inputText && !file)} className="submit-btn">
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
