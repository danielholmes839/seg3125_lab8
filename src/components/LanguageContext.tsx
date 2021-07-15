import React from "react";
import { useContext } from "react";
import { useState } from "react";

enum Language {
  ENGLISH = "english",
  FRENCH = "french",
}

type Translation = {
  titleText: string;
  seasonText: string;
  episodeText: string;
  favouriteCharacterText: string;
  voteText: string;
  attendText: string;
  attendingText: string;
  englishText: string;
  frenchText: string;
  watchPartyText: string;
  editText: string;
  createText: string;
  sendText: string;
  contactText: string;
  contactPlaceholder: string;
};

type LanguageContextValue = {
  language: Language;
  translation: Translation;
  setLanguage(language: Language): void;
};

const english: Translation = {
  titleText: "The Office Fanclub",
  seasonText: "Season",
  episodeText: "Episodes",
  favouriteCharacterText: "Favourite Character Vote!",
  voteText: "VOTE",
  attendText: "Attend",
  attendingText: "Attending!",
  englishText: "English",
  frenchText: "French",
  watchPartyText: "Watch Parties",
  editText: "Edit",
  createText: "Create",
  sendText: "Send",
  contactText: "Contact Support",
  contactPlaceholder: "Tell us about any issues with the site",
};

const french: Translation = {
  titleText: "Le Office Fanclub",
  seasonText: "Saison",
  episodeText: "Épisodes",
  favouriteCharacterText: "Vote de Personnage Préféré!",
  voteText: "VÔTE",
  attendText: "Participer",
  attendingText: "Participante!",
  englishText: "Anglais",
  frenchText: "Francais",
  watchPartyText: "Regard Party",
  editText: "Éditer",
  createText: "Créer",
  sendText: "Soumettre",
  contactText: "Contactez Support",
  contactPlaceholder: "Parlez-nous des problèmes avec le site",
};

const translations: { [key in Language]: Translation } = {
  english: english,
  french: french,
};

const LanguageContext = React.createContext<LanguageContextValue>(null as any);

const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState(Language.ENGLISH);
  const value: LanguageContextValue = {
    language: language,
    setLanguage: setLanguage,
    translation: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => useContext(LanguageContext);

export { LanguageProvider, useLanguage, Language };
