import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData(); // Extract form data
    const files = formData.getAll("character-pdf-1"); // Extract uploaded PDFs

    console.log("Received files:", files);

    return NextResponse.json({ message: "Files received successfully", files });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error processing file upload" }, { status: 500 });
  }
}