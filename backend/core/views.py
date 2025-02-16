
import pdfplumber
from django.shortcuts import render
from .forms import PDFUploadForm
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from rest_framework import status

class HelloWorldView(APIView):
    def get(self, request):
        return Response({"message": "Hello from Django!"}, status=status.HTTP_200_OK)

# Process an uploaded pdf, returning the separate text field contained within.
# Currently not sensitive to differing text boxes, with regard to character sheets.
def handle_uploaded_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text_fields = []
        for page in pdf.pages:
            text_fields.append(page.extract_text())
        return text_fields

# Handles the http request for uploading a pdf.
# Process the pdf into separate text boxes and render the results.
def upload_pdf(request):
    if request.method == 'POST' and request.FILES['pdf_file']:
        form = PDFUploadForm(request.POST, request.FILES)
        if form.is_valid():
            pdf_document = form.save()
            pdf_path = pdf_document.pdf_file.path
            text_fields = handle_uploaded_pdf(pdf_path)
            return render(request, 'pdf_results.html', {'text_fields': text_fields})
    else:
        form = PDFUploadForm()
    return render(request, 'upload_pdf.html', {'form': form})
