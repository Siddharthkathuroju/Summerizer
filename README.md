AI-Powered Text Summarizer: Mr. Summerizer

Mr. Summerizer is a powerful AI-driven tool designed to simplify the process of summarizing text. Whether it's lengthy articles, reports, or any form of textual content, this application leverages cutting-edge AI technology to provide concise and meaningful summaries, saving you time and effort.

---

Features
- **Paste or Upload**: Input text directly into the text area or upload files in PDF format.
- **AI-Powered Summarization**: Harness the power of AI to generate accurate and context-aware summaries.
- **Responsive Design**: Optimized for all devices, ensuring a seamless user experience.
- **Real-Time Results**: Quickly process and receive summaries in seconds.

---

Technologies Used
- **Frontend**:  Next.js for a fast, modern, and responsive interface.
- **Styling**: Tailwind CSS for clean and customizable designs.
- **Backend**: API routes in Next.js to handle requests and communicate with the Gemini API. The text reading or extraction is done by the library pdfparse.
- **Gemini API**: A powerful summarization API for generating summaries from textual content.

---

How It Works
1. Enter text into the input field or upload a file.
2. Click the "Summarize" button to send the content to the Gemini API.
3. View the summarized content displayed below the text area.

---

Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Siddharthkathuroju/Summerizer.git
   cd Summerizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your API key:
   - Create a `.env.local` file in the root directory.
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_api_key_here
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.



Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request for bug fixes, enhancements, or new features.

---

License
This project is open-source and available under the [MIT License](LICENSE).


