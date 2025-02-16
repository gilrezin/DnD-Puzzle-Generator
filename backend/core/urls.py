from django.urls import path
from .views import upload_file, get_uploaded_files, get_prompt_result

urlpatterns = [
    path("", upload_file, name="upload_file"),
    path("files/", get_uploaded_files, name="get_uploaded_files"),
    path("output/", get_prompt_result, name="get_prompt_result")
]
