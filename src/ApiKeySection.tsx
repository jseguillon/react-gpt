import ApiKeyInput from "./ApiKeyInput";

const ApiKeySection: React.FC = () => {
  return (
    <section className="py-2 flex flex-col gap-1">
      <h2 className="text-xl">Api Key</h2>
      <p>
        <ApiKeyInput />
      </p>
    </section>
  );
};

export default ApiKeySection;
