import ChatInterface from "@/components/blocks/ChatInterface";
import AgentMenuBar from "@/components/blocks/AgentMenuBar";
import ActionInfoBar from "@/components/blocks/ActionInfoBar";
export default function Page() {
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen">
        <AgentMenuBar />
        <ChatInterface />
        <ActionInfoBar />
      </div>
    </>
  );
}
