import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";

const WatchPartyAttendance: React.FC = () => {
  const { attendingText, attendText } = useLanguage().translation;
  const [attending, setAttending] = useState(false);

  if (!attending) {
    return (
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 rounded mt-3"
        onClick={() => setAttending(true)}
      >
        {attendText}
      </button>
    );
  } else {
    return (
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded mt-3"
        onClick={() => setAttending(false)}
      >
        {attendingText}
      </button>
    );
  }
};

export default WatchPartyAttendance;
