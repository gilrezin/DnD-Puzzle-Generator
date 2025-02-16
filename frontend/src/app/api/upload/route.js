import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("character-pdf-1");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Send file to Django backend
    const djangoResponse = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });

    if (!djangoResponse.ok) {
      throw new Error("Failed to upload file to Django");
    }

    const data = await djangoResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error processing file upload" }, { status: 500 });
  }
}