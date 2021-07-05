import React from "react";
import Episodes from "components/Episodes";
import Vote from "components/Vote";

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl">The Office Fanclub</h1>
      <Episodes />
      <Vote />
    </div>
  );
};

export default App;
