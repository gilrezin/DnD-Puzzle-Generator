import CharacterPDFForm from "@/components/ui/characterPDFForm";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-blue-900 dark:bg-black">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <CharacterPDFForm />
    </main>
  );
}