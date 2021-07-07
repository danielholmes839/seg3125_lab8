import { useState } from "react";
import { seasons, EpisodeData } from "data/episodes";
import { Pill } from "./Pill";
import WatchPartyForm from "components/WatchPartyForm";
import { parties as initialParties, WatchPartyData } from "data/parties";

type Props = {
  party: WatchPartyData;
};

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

const WatchParty: React.FC<Props> = ({
  party: { title, location, date, season, episode },
}) => {
  const { title: episodeTitle, description }: EpisodeData =
    seasons[season][episode];

  return (
    <div className="rounded overflow-hidden shadow py-5 px-7">
      <h1 className="text-xl">{title}</h1>
      <div className="my-2">
        <Pill>
          S{season + 1}:E{episode + 1} {episodeTitle}
        </Pill>
        <span className="text-sm">{date.toLocaleString()}</span>
      </div>
      <p>{location}</p>
      {/* <p className="line-limit-2 text-sm">{description}</p> */}
      <WatchPartyAttendance />
    </div>
  );
};

const WatchPartySection: React.FC = () => {
  const [parties, setParties] = useState<WatchPartyData[]>(initialParties);

  const addParty = (party: WatchPartyData) => {
    // addParty to parties
    const newParties = [party, ...parties].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setParties(newParties);
  };

  return (
    <div className="mt-5 mb-20">
      <h1 className="text-3xl">Watch Parties</h1>
      <div className="mt-5 gap-5 grid grid-cols-3">
        {parties.map((party, i) => (
          <WatchParty key={i} party={party} />
        ))}
      </div>
      <WatchPartyForm addParty={addParty} />
    </div>
  );
};

export default WatchPartySection;
