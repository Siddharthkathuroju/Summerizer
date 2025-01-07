import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false, // Disable body parser to handle file uploads
  },
};

export async function POST(req) {
  try {
    // Check for multipart form data
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const boundary = contentType.split('=')[1];
    const formData = await parseMultipartFormData(req, boundary);

    if (!formData.file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Parse the uploaded PDF file
    const pdfData = await pdfParse(formData.file);
    const extractedText = pdfData.text;

    // Summarize the extracted text (you can integrate your summarization logic here)
    const summary = summarizeText(extractedText);

    return NextResponse.json({ content: summary });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}

// Function to parse multipart form data
async function parseMultipartFormData(req, boundary) {
  const rawData = await req.arrayBuffer();
  const parts = rawData
    .toString()
    .split(`--${boundary}`)
    .filter((part) => part && part !== '--');
  
  const result = {};

  for (const part of parts) {
    const [headers, body] = part.split('\r\n\r\n');
    const disposition = headers.match(/Content-Disposition: form-data; name="(.+?)"(; filename="(.+?)")?/);
    const name = disposition[1];
    const filename = disposition[3];

    if (filename) {
      result[name] = new Blob([body.trim()], { type: 'application/pdf' });
    } else {
      result[name] = body.trim();
    }
  }

  return result;
}

// Mock summarization function
function summarizeText(text) {
  // Replace this with actual summarization logic or API call
  const sentences = text.split('. ');
  return sentences.slice(0, 3).join('. ') + '...'; // Return the first 3 sentences as a summary
}
