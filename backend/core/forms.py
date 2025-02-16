
from django import forms
from .models import PDFDocument

# Handels the pdf file upload
class PDFUploadForm(forms.ModelForm):
    class Meta:
        model = PDFDocument
        fields = ['pdf_file']
