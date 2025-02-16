import json
import os
import subprocess
import fitz  # PyMuPDF for extracting text
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import re
from .prompt import run

from .prompt import create_prompt

# In-memory storage for uploaded files (for quick access in development)
uploaded_files = []
uploaded_file_paths = []

@csrf_exempt
def upload_file(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        background_info = request.POST.get("background_info", "")

        # Save the file
        file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
        file_url = f"/media/{file_path}"
        uploaded_file_paths.append(file_path)

        # Extract text from the PDF
        extracted_text = extract_text_from_pdf(file_path)

        # Send extracted text and background info to AI model
        ai_output_raw = generate_dnd_scenario(extracted_text, background_info)

        # Log raw AI output for debugging
        print("Raw AI Output:", ai_output_raw)

        # Store file URL, extracted text, and raw AI output
        uploaded_files.append({
            "file_url": file_url,
            "background_info": background_info,
            "extracted_text": extracted_text,
            "ai_output": ai_output_raw  # Send raw response directly
        })

        return JsonResponse({
            "message": "File uploaded and processed successfully",
            "file_url": file_url,
            "background_info": background_info,
            "extracted_text": extracted_text,
            "ai_output": ai_output_raw  # Send raw response directly
        })

    return JsonResponse({"error": "No file uploaded"}, status=400)


def extract_text_from_pdf(file_path):
    """Extracts and cleans text from a given PDF file."""
    full_path = os.path.join("media", file_path)
    text = ""

    try:
        with fitz.open(full_path) as doc:
            for page in doc:
                text += page.get_text("text") + "\n"

        text = clean_extracted_text(text)

    except Exception as e:
        text = f"Error extracting text: {str(e)}"

    return text


def clean_extracted_text(text):
    """Cleans extracted text by removing extra spaces and formatting issues."""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def generate_dnd_scenario(extracted_text, background_info):
    """Runs prompt.py and sends raw AI response directly to the frontend."""
    try:
        text = background_info + " The players are: " + extracted_text
        result = run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", text)

        print("Raw AI Response from prompt.py:", result)

        return result  # Send AI response as-is

    except Exception as e:
        return json.dumps({"error": f"AI processing failed: {str(e)}"})


@csrf_exempt
def get_prompt_result(request):
    """Returns the direct result from the LLM after prompting it with all current inputs."""
    if request.method == "GET":
        if (uploaded_file_paths.count < 1):
            return JsonResponse({"error": "No files uploaded"}, status=400)
        
        prompt_result = create_prompt("placeholder background", uploaded_file_paths)
        return JsonResponse({"output": prompt_result})
    
    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def get_uploaded_files(request):
    """Returns a list of uploaded files and their associated background info"""
    return JsonResponse({"uploads": uploaded_files})