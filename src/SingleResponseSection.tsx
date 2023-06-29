import React from "react";
import { ApiKeyHelper } from "./ApiKeyHelper";
import _ from "lodash";

const SingleResponseSection: React.FC = () => {
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
            messages: [{ role: "user", content: prompt }]
          })
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);

      setAnswer(_.toString(_.get(data, "choices.0.message.content")));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-2 flex flex-col gap-1">
      <h2 className="text-xl">Single Response</h2>
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

export default SingleResponseSection;
