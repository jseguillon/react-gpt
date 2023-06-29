import React from "react";
import { ApiKeyHelper } from "./ApiKeyHelper";
import _ from "lodash";

const StreamResponseSection: React.FC = () => {
  const [answer, setAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const prompt = "Count from 0 to 10, use English word instead of number";

  const handleClickSend = async () => {
    setAnswer("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ApiKeyHelper.getKey()}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            max_tokens: 2048,
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
            stream: true
          })
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Error: fail to read data from response");
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const textDecoder = new TextDecoder("utf-8");
        const chunk = textDecoder.decode(value);

        console.log(chunk);

        let deltaText = "";
        for (const line of chunk.split("\n")) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") {
            continue;
          }

          const json = trimmedLine.replace("data: ", "");
          const obj = JSON.parse(json);
          const content = _.toString(_.get(obj, "choices.0.delta.content"));
          deltaText = deltaText.concat(content);
        }

        setAnswer((prev) => prev.concat(deltaText));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-2 flex flex-col gap-1">
      <h2 className="text-xl">Stream Response</h2>
      <div>
        <p>Prompt: </p>
        <p className="pl-8">{prompt}</p>
        <div className="py-2">
          <button
            className="rounded-md bg-sky-500/100 disabled:opacity-75 px-2 py-1"
            onClick={handleClickSend}
            disabled={isLoading}
          >
            Send to OpenAI
          </button>
        </div>
        {answer && (
          <>
            <p>Answer: </p>
            <p className="pl-8">{answer}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default StreamResponseSection;
