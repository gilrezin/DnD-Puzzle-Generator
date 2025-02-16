from django.db import models

# Represents an uploaded pdf file
class PDFDocument(models.Model):
    pdf_file = models.FileField(upload_to='pdfs/')
