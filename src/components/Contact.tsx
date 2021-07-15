import React from "react";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const Contact = () => {
  const { sendText, contactText, contactPlaceholder } =
    useLanguage().translation;
  const [text, setText] = useState("");

  const send = () => {
    setText("");
    alert("Successfully sent your message to support");
  };

  return (
    <div className="mt-5 mb-10">
      <h1 className="text-3xl">{contactText}</h1>
      <a
        href="mailto:support@officefanclub.com"
        className="text-blue-500 underline"
      >
        support@officefanclub.com
      </a>
      <div>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="focus:outline-none border border-gray-200 rounded px-2 py-1 mt-2 w-96"
          placeholder={contactPlaceholder}
        />
      </div>

      <button
        onClick={send}
        className="bg-blue-500 text-white font-semibold px-5 py-1 rounded w-96 hover:bg-blue-600"
      >
        {sendText}
      </button>
    </div>
  );
};

export default Contact;
