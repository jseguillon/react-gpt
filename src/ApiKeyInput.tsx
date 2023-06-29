import React from "react";
import { ApiKeyHelper } from "./ApiKeyHelper";

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = React.useState(ApiKeyHelper.getKey());

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    setApiKey(value);
    ApiKeyHelper.setKey(value);
  };

  return (
    <input
      type="password"
      value={apiKey}
      onChange={handleChange}
      className="w-full"
    />
  );
};

export default ApiKeyInput;
