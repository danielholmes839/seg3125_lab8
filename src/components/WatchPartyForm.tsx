import React, { useState } from "react";
import { WatchPartyData } from "data/parties";
import { seasons } from "data/episodes";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useEffect } from "react";
import { useMemo } from "react";

type Props = {
  party?: WatchPartyData;
  addParty(party: WatchPartyData): void;
  closeModal(): void;
};

type EpisodeNumber = {
  season: number;
  episode: number;
};

type FormText = {
  formTitle: string;
  formSubmit: string;
};

const WatchPartyForm: React.FC<Props> = ({ party, addParty, closeModal }) => {
  const [episodeNumber, setEpisodeNumber] = useState<EpisodeNumber>({
    season: 0,
    episode: 0,
  });

  const { formTitle, formSubmit } = useMemo<FormText>(() => {
    if (party === undefined) {
      return {
        formSubmit: "Create",
        formTitle: "New Watch Party",
      };
    } else {
      return {
        formSubmit: "Edit",
        formTitle: "Edit Watch Party",
      };
    }
  }, [party]);

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if (party === undefined) {
      return;
    }

    setEpisodeNumber({
      episode: party.episode,
      season: party.season,
    });

    setDate(party.date);
    setTitle(party.title);
    setLocation(party.location);
  }, [party]);

  // Reseting errors
  useEffect(() => {
    setTitleError(false);
  }, [title]);

  useEffect(() => {
    setLocationError(false);
  }, [location]);

  // Changing season and episode numbers
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

      closeModal();
    }
  };

  return (
    <div className="w-96 p-10 pb-3 shadow mt-5 bg-white rounded-lg">
      <h1 className="text-3xl">{formTitle}</h1>

      <h2 className="font-semibold mt-3">Title</h2>
      <input
        type="text"
        className="focus:outline-none border border-gray-200 rounded px-2 py-1 w-full"
        placeholder="ex: Epic Watch Party 1 "
        onChange={(e) => setTitle(e.target.value)}
        value={title}
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
        value={location}
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
        value={date}
        formatDate={(d) => d.toLocaleDateString()}
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
        {formSubmit}
      </button>
      <div className="text-center mt-1">
        <button onClick={closeModal} className="text-red-500 text-sm mx-auto">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WatchPartyForm;
