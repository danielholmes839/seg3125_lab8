import React from "react";
import Episodes from "components/Episodes";
import Vote from "components/Vote";
import WatchParty from "components/WatchParty";
import Contact from "components/Contact";
import { Language, useLanguage } from "components/LanguageContext";

const App: React.FC = () => {
  const {
    language,
    setLanguage,
    translation: { titleText },
  } = useLanguage();

  return (
    <div className="container mx-auto">
      <h1 className="text-6xl">{titleText}</h1>
      <select
        className="w-52 p-1 my-3 mr-5 rounded text-lg border border-gray-100 focus:outline-none hover:shadow-sm"
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        <option
          value={Language.ENGLISH}
          selected={Language.ENGLISH === language}
        >
          English
        </option>
        <option value={Language.FRENCH} selected={Language.FRENCH === language}>
          French
        </option>
      </select>
      <Episodes />
      <Vote />
      <WatchParty />
      <Contact />
    </div>
  );
};

export default App;
