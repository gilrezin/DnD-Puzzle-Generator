"use client"; // tells file that it is a client component

import { useState } from "react"; // react hook that allows us to manage component state
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Loader2, X } from "lucide-react"; // lucide icons

export default function CharacterPDFForm() { // declares this as a component that can be imported elsewhere
  const [pdfInputs, setPdfInputs] = useState([{ id: 1 }]); // pdfInputs is a state variable that holds an array of objects with an id key, starts with one object
  const [backgroundInfo, setBackgroundInfo] = useState(""); // backgroundInfo holds the background information for the character
  const [isGenerating, setIsGenerating] = useState(false);  // isGenerating is true when the form is being submitted, It prevents multiple submissions & shows a loading spinner

  const addPdfInput = () => { // adds a new pdf input to the form
    setPdfInputs([...pdfInputs, { id: Date.now() }]); // date.now() is used to generate a unique id
  };

  const removePdfInput = (id) => { // removes a pdf input from the form
    if (pdfInputs.length > 1) { // ensures that there is at least one pdf input
      setPdfInputs(pdfInputs.filter((input) => input.id !== id));
    }
  };

  const handleSubmit = async (event) => { // handles form submission
    event.preventDefault(); // prevents the page from reloading when the form is submitted
    setIsGenerating(true); // sets isGenerating to true to show the loading spinner

    const formData = new FormData(event.currentTarget); // collects all the form data

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000)); // waits for 2 seconds

    setIsGenerating(false); // sets isGenerating to false to hide the loading spinner

    // Handle the response from backend

  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Character PDF Submission</h1>
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
          <Plus className="mr-2 h-4 w-4" /> Add Another PDF
        </Button>
        <Textarea
            placeholder="Enter background information here..."
            value={backgroundInfo}
            onChange={(e) => setBackgroundInfo(e.target.value)}
            rows={4}
            className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
