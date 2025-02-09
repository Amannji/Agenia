"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      <>
        <nav className="w-full px-6 py-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold">Agenia</h1>
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push("/chat")}
          >
            Try it for free
          </Button>
        </nav>

        <main className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold leading-tight mb-6">
                Your Smart DeFi Assistant
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Navigate the world of decentralized finance with ease. Agenia
                simplifies complex DeFi concepts and helps you make informed
                decisions through natural conversations.
              </p>
              <Button variant="default" size="lg">
                Get Started Now
              </Button>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Agenia Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
