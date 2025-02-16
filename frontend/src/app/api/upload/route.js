import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const backgroundInfo = formData.get("background_info");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Prepare form data to send to Django
    const djangoFormData = new FormData();
    djangoFormData.append("file", file, file.name);
    if (backgroundInfo) {
      djangoFormData.append("background_info", backgroundInfo);
    }

    // Send file and background info to Django backend
    const djangoResponse = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: djangoFormData,
    });

    if (!djangoResponse.ok) {
      throw new Error("Failed to upload file to Django");
    }

    // Get response from Django
    const data = await djangoResponse.json();

    return NextResponse.json({
      message: "File successfully uploaded to Django",
      django_response: data,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error processing file upload" }, { status: 500 });
  }
}
