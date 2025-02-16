from django.db import models

class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

# Represents an uploaded pdf file
class PDFDocument(models.Model):
    pdf_file = models.FileField(upload_to='pdfs/')
