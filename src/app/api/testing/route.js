import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing
  },
};

export async function POST(req) {
  console.log("Received a POST request to /api/Extract");

  try {
    // Validate Content-Type
    const contentType = req.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    // Extract boundary from Content-Type
    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      return NextResponse.json({ error: "Boundary not found in content type" }, { status: 400 });
    }
    console.log("Boundary:", boundary);

    // Read raw body
    let rawBody;
    try {
      rawBody = await req.arrayBuffer();
    } catch (error) {
      console.error("Error reading request body:", error);
      return NextResponse.json({ error: "Error reading request body" }, { status: 500 });
    }

    // Split body into parts
    const parts = new TextDecoder().decode(rawBody).split(`--${boundary}`);
    const pdfFilePart = parts.find((part) => part.includes("filename"));

    if (!pdfFilePart) {
      return NextResponse.json({ error: "PDF file not found in the request" }, { status: 400 });
    }

    // Extract the binary data of the PDF file
    const fileStartIndex = pdfFilePart.indexOf("\r\n\r\n") + 4;
    const fileEndIndex = pdfFilePart.lastIndexOf("\r\n--");
    const pdfBuffer = Buffer.from(
      pdfFilePart.slice(fileStartIndex, fileEndIndex).trim(),
      "binary"
    );

    console.log("PDF file successfully extracted.");

    // Use pdf-parse to extract text from PDF
    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    console.log("PDF text extraction successful.");
    return NextResponse.json({ extractedText });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
