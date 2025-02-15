"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Loader2, X } from "lucide-react";

export default function CharacterPDFForm() {
  const [pdfInputs, setPdfInputs] = useState([{ id: 1 }]);
  const [backgroundInfo, setBackgroundInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsGenerating(false);
    // Handle the response from your backend here
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Character PDF Submission</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {pdfInputs.map((input) => (
          <div key={input.id} className="flex items-center space-x-2">
            <Input
              type="file"
              name={`character-pdf-${input.id}`}
              accept=".pdf"
              required
              className="flex-grow"
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
          <Plus className="mr-2 h-4 w-4" /> Add Another PDF
        </Button>
        <Textarea
          placeholder="Enter background information here..."
          value={backgroundInfo}
          onChange={(e) => setBackgroundInfo(e.target.value)}
          rows={4}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
    </div>
  );
}
