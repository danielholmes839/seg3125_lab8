import { useState } from "react";
import { seasons, EpisodeData } from "data/episodes";
import { Pill } from "./Pill";
import WatchPartyForm from "components/WatchPartyForm";
import WatchPartyAttendance from "components/WatchPartyAttendance";
import { parties as initialParties, WatchPartyData } from "data/parties";
import Modal from "react-modal";
import { useLanguage } from "./LanguageContext";

const style: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "",
    border: "",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type WatchPartyCardProps = {
  party: WatchPartyData;
  edit: (party: WatchPartyData) => void;
};

const WatchPartyCard: React.FC<WatchPartyCardProps> = ({ edit, party }) => {
  const { editText } = useLanguage().translation;
  const { title, location, date, season, episode, owner } = party;
  const { title: episodeTitle }: EpisodeData = seasons[season][episode];

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="rounded overflow-hidden shadow py-5 px-7">
      <h1 className="text-xl inline">{title}</h1>
      {owner && (
        <button
          onClick={openModal}
          className="inline float-right text-sm text-blue-500 mt-2"
        >
          {editText}
        </button>
      )}
      <div className="my-2">
        <Pill>
          S{season + 1}:E{episode + 1} {episodeTitle}
        </Pill>
        <span className="text-sm">{date.toLocaleDateString()}</span>
      </div>
      <p>{location}</p>
      <WatchPartyAttendance />

      <Modal isOpen={isOpen} style={style}>
        <WatchPartyForm addParty={edit} party={party} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

const WatchPartySection: React.FC = () => {
  const { watchPartyText, createText } = useLanguage().translation;
  const [parties, setParties] = useState<WatchPartyData[]>(initialParties);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const addParty = (party: WatchPartyData) => {
    // add a party to parties
    const newParties = [party, ...parties].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setParties(newParties);
  };

  const editParty = (partyIndex: number) => {
    // edits a party
    return (party: WatchPartyData) => {
      const newParties = parties.slice();
      newParties[partyIndex] = party;
      setParties(newParties);
      closeModal();
    };
  };

  return (
    <div className="mt-5 mb-20">
      <h1 className="text-3xl">{watchPartyText}</h1>
      <button onClick={openModal} className="text-blue-500">
        {createText}
      </button>
      <div className="mt-5 gap-5 grid grid-cols-3">
        {parties.map((party, i) => (
          <WatchPartyCard key={i} party={party} edit={editParty(i)} />
        ))}
      </div>
      <Modal isOpen={isOpen} style={style}>
        <WatchPartyForm addParty={addParty} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default WatchPartySection;
