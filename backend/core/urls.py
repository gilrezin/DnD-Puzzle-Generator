from django.urls import path
from .views import upload_file, get_uploaded_files

urlpatterns = [
    path("", upload_file, name="upload_file"),
    path("files/", get_uploaded_files, name="get_uploaded_files"),
]
