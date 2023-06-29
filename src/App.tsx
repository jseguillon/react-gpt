import React from "react";
import "./styles.css";
import ApiKeySection from "./ApiKeySection";
import SingleResponseSection from "./SingleResponseSection";
import StreamResponseSection from "./StreamResponseSection";

const App: React.FC = () => {
  return (
    <div className="h-full">
      <h1 className="text-2xl">DIY ChatGPT - Stream Chat with OpenAI API</h1>
      <hr />

      <ApiKeySection />
      <hr />

      <div className="flex">
        <div className="flex-1">
          <SingleResponseSection />
        </div>
        <div className="flex-1">
          <StreamResponseSection />
        </div>
      </div>
    </div>
  );
};

export default App;
