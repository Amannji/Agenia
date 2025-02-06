import { ChatOpenAI } from "@langchain/openai";
import { LangChainAdapter } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    modelName: "Meta-Llama-3-8B-Instruct-Q5_K_M",
    configuration: {
      baseURL: "http://localhost:8080/v1",
    },
  });

  const stream = await model.stream(prompt);

  return LangChainAdapter.toDataStreamResponse(stream);
}
