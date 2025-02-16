from pdfminer.high_level import extract_text
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import os

from .prompt import create_prompt

# In-memory storage for uploaded files (for quick access in development)
uploaded_files = []
uploaded_file_paths = []

@csrf_exempt
def upload_file(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        background_info = request.POST.get("background_info", "")

        if not uploaded_file.name.endswith(".pdf"):
            return JsonResponse({"error": "Only PDF files are supported"}, status=400)

        # Save the file
        file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
        file_url = f"/media/{file_path}"
        uploaded_file_paths.append(file_path)

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(default_storage.path(file_path))

        file_data = {
            "file_url": file_url,
            "background_info": background_info,
            "extracted_text": extracted_text
        }
        uploaded_files.append(file_data)

        return JsonResponse({
            "message": "File uploaded and processed successfully",
            "file_url": file_url,
            "background_info": background_info,
            "extracted_text": extracted_text
        })

    return JsonResponse({"error": "No file uploaded"}, status=400)

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

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file using pdfminer.six"""
    try:
        return extract_text(pdf_path).split("\n")  # Extract and split text by line
    except Exception as e:
        return {"error": f"Failed to process PDF: {str(e)}"}
