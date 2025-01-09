// filepath: /c:/Users/siddh/OneDrive/Desktop/text_summary/src/app/api/Extract/route.js
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
    if (!boundary) {
      return NextResponse.json({ error: "Boundary not found in content type" }, { status: 400 });
    }
    console.log("Boundary:", boundary);

    let rawBody;
    try {
      rawBody = await req.arrayBuffer();
    } catch (error) {
      console.error("Error reading request body:", error);
      return NextResponse.json({ error: "Error reading request body" }, { status: 500 });
    }

    const parts = new TextDecoder().decode(rawBody).split(`--${boundary}`);
    const pdfFilePart = parts.find((part) => part.includes("filename"));

    if (!pdfFilePart) {
      return NextResponse.json({ error: "PDF file not found in the request" }, { status: 400 });
    }

    // Continue processing the PDF file part...
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}