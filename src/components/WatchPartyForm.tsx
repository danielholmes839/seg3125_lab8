import React, { useState } from "react";
import { WatchPartyData } from "data/parties";
import { seasons } from "data/episodes";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { ModifiersUtils } from "react-day-picker/types/Modifiers";
import { useEffect } from "react";

type Props = {
  addParty(party: WatchPartyData): void;
};

type EpisodeNumber = {
  season: number;
  episode: number;
};

type Errors = {
  title: boolean;
  location: boolean;
};

const WatchPartyForm: React.FC<Props> = ({ addParty }) => {
  const [episodeNumber, setEpisodeNumber] = useState<EpisodeNumber>({
    season: 0,
    episode: 0,
  });

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  useEffect(() => {
    setLocationError(false);
  }, [location]);

  const seasonOnChange = (e: any) => {
    let season = parseInt(e.target.value);
    setEpisodeNumber({ season: season, episode: 0 });
  };

  const episodeOnChange = (e: any) => {
    let episode = parseInt(e.target.value);
    setEpisodeNumber({ ...episodeNumber, episode: episode });
  };

  const { season, episode } = episodeNumber;

  const submit = () => {
    let error = false;

    if (title.length === 0) {
      setTitleError(true);
      error = true;
    }

    if (location.length === 0) {
      setLocationError(true);
      error = true;
    }

    if (!error) {
      addParty({
        date: date,
        location: location,
        episode: episode,
        season: season,
        owner: true,
        title: title,
      });
    }
  };

  return (
    <div className="w-96 p-5 shadow mt-5">
      <h1 className="text-3xl">New Watch Party</h1>

      <h2 className="font-semibold mt-3">Title</h2>
      <input
        type="text"
        className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full"
        placeholder="ex: Epic Watch Party 1 "
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && (
        <p className="text-red-500 text-sm">Please enter a title</p>
      )}

      <h2 className="font-semibold mt-3">Location</h2>
      <input
        type="text"
        className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full"
        placeholder="ex: Scranton Pennsylvania"
        onChange={(e) => setLocation(e.target.value)}
      />
      {locationError && (
        <p className="text-red-500 text-sm">Please enter a location</p>
      )}

      <h2 className="font-semibold mt-3">Date</h2>
      <DayPickerInput
        component={(props: any) => (
          <input
            {...props}
            className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full text-gray-900"
          />
        )}
        onDayChange={(day) => setDate(day)}
        classNames={{
          container: "w-full",
          overlay: "DayPickerInput-Overlay",
          overlayWrapper: "DayPickerInput-OverlayWrapper",
        }}
        placeholder="YYYY-M-D - defaults to today"
        dayPickerProps={{ disabledDays: { before: new Date() } }}
      />
      <h2 className="font-semibold mt-3">Episode</h2>
      <select
        onChange={seasonOnChange}
        className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full"
      >
        {seasons.map((_, i) => (
          <option value={i} selected={i === season}>
            Season {i + 1}
          </option>
        ))}
      </select>
      <select
        onChange={episodeOnChange}
        className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full mt-3"
      >
        {seasons[season].map((e, i) => (
          <option value={i} selected={i === episode}>
            E{i + 1}: {e.title}
          </option>
        ))}
      </select>
      <button
        onClick={submit}
        className="bg-blue-500 hover:bg-blue-600 w-full hover:shadow py-2 rounded font-semibold tracking-wider text-white text-sm mt-3"
      >
        Create
      </button>
    </div>
  );
};

export default WatchPartyForm;
