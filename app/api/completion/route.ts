import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    modelName: "llama70b",
    configuration: {
      baseURL: "https://llama70b.gaia.domains/v1",
    },
  });

  const stream = await model.stream(prompt);

  return LangChainAdapter.toDataStreamResponse(stream);
}
