import React, { useState } from "react";

const WatchPartyAttendance: React.FC = () => {
  const [attending, setAttending] = useState(false);

  if (!attending) {
    return (
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 rounded mt-3"
        onClick={() => setAttending(true)}
      >
        Attend
      </button>
    );
  } else {
    return (
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded mt-3"
        onClick={() => setAttending(false)}
      >
        Attending!
      </button>
    );
  }
};

export default WatchPartyAttendance;
