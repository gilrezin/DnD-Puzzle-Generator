"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Loader2, X } from "lucide-react";

export default function CharacterPDFForm() {
  const [pdfInputs, setPdfInputs] = useState([{ id: 1 }]);
  const [backgroundInfo, setBackgroundInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded files

  // Fetch uploaded files from Django when the page loads
  useEffect(() => {
    fetchUploadedFiles();
    backgroundInfo = document.cookie;
  }, []);

  const fetchUploadedFiles = () => {
    fetch("http://localhost:8000/upload/files/")
      .then((res) => res.json())
      .then((data) => {
        if (data.uploads) {
          setUploadedFiles(data.uploads);
        }
      })
      .catch((err) => console.error("Error fetching uploaded files:", err));
  };

  const addPdfInput = () => {
    setPdfInputs([...pdfInputs, { id: Date.now() }]);
  };

  const removePdfInput = (id) => {
    if (pdfInputs.length > 1) {
      setPdfInputs(pdfInputs.filter((input) => input.id !== id));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);

    const formData = new FormData(event.currentTarget);

    try {
      for (const input of pdfInputs) {
        const fileInput = formData.get(`character-pdf-${input.id}`);

        if (fileInput) {
          const singleFormData = new FormData();
          singleFormData.append("file", fileInput);
          singleFormData.append("background_info", backgroundInfo);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: singleFormData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload");
          }

          const result = await response.json();
          console.log(`File ${input.id} uploaded successfully:`, result);
        }
      }

      alert("All files processed successfully!");
      
      // Refresh the uploaded files list after submission
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to upload files.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-lg">
      <div style={{ fontFamily: "'Petit Formal Script', cursive" }}>
      <b><h1>Dungeons and Dragons: Co-DM</h1></b>
      <h2>Diversify your D&D experience!</h2></div>
      <h4>Let us create new, exciting scenario ideas for your players!</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        {pdfInputs.map((input) => (
          <div key={input.id} className="flex items-center space-x-2">
            <Input
              type="file"
              name={`character-pdf-${input.id}`}
              accept=".pdf"
              required
              className="flex-grow dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <FileText className="text-gray-400 flex-shrink-0" />
            {pdfInputs.length > 1 && (
              <Button
                type="button"
                onClick={() => removePdfInput(input.id)}
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove PDF</span>
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addPdfInput} variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Another Character PDF
        </Button>
        <Textarea
          placeholder="What's your game's background? Summarize your adventure thus far."
          value={backgroundInfo}
          onChange={(e) => {
            setBackgroundInfo(e.target.value);
            document.cookie = `backgroundInfo=${e.target.value}`;
          }}
          rows={4}
          className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <Button type="submit" className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Generate!"
          )}
        </Button>
      </form>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Uploaded Files</h2>
          <ul className="mt-2 space-y-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                <a
                  href={`http://localhost:8000${file.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer" // Fix for blocked popups
                  className="text-blue-500 underline"
                >
                  View PDF {index + 1}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-300">Background: {file.background_info}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
