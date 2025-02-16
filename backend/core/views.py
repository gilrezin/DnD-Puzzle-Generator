from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import os

# In-memory storage for uploaded files (for quick access in development)
uploaded_files = []

@csrf_exempt
def upload_file(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        background_info = request.POST.get("background_info", "")

        # Save file
        file_path = default_storage.save(f"uploads/{uploaded_file.name}", uploaded_file)
        file_url = f"/media/{file_path}"

        # Store file URL and background info
        uploaded_files.append({"file_url": file_url, "background_info": background_info})

        return JsonResponse({
            "message": "File uploaded successfully",
            "file_url": file_url,
            "background_info": background_info  
        })

    return JsonResponse({"error": "No file uploaded"}, status=400)

@csrf_exempt
def get_uploaded_files(request):
    """Returns a list of uploaded files and their associated background info"""
    return JsonResponse({"uploads": uploaded_files})
