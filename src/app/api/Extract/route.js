import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  console.log("Received a POST request to /api/Extract");
  try {
    const contentType = req.headers.get("content-type");
    console.log("Content-Type:", contentType);
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const boundary = contentType.split("boundary=")[1];
    console.log("Boundary:", boundary);
    const rawBody = await req.arrayBuffer();
    const parts = new TextDecoder().decode(rawBody).split(`--${boundary}`);
    const pdfFilePart = parts.find((part) => part.includes("filename"));

    if (!pdfFilePart) {
      console.error("No PDF file found in the request.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileStartIndex = pdfFilePart.indexOf("\r\n\r\n") + 4;
    const fileEndIndex = pdfFilePart.lastIndexOf("\r\n--");
    const pdfBuffer = Buffer.from(pdfFilePart.slice(fileStartIndex, fileEndIndex).trim(), "binary");

    console.log("PDF file received and parsed.");

    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    console.log("Text extraction successful.");

    return NextResponse.json({ extractedText });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: `Failed to process file: ${error.message}` }, { status: 500 });
  }
}
