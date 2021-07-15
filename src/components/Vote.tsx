import React, { useState, useEffect } from "react";
import { Pill } from "./Pill";
import imgMichael from "img/michael.jpg";
import imgJim from "img/jim.jpg";
import imgPam from "img/pam.jpg";
import imgDwight from "img/dwight.jpeg";
import trophy from "img/trophy.png";
import { useLanguage } from "./LanguageContext";

type CharacterData = {
  actor: string;
  name: string;
  img: any;
};

const characters: CharacterData[] = [
  {
    actor: "Steve Carell",
    name: "Michael G. Scott",
    img: imgMichael,
  },
  {
    actor: "John Krasinski",
    name: "Jim Halpert",
    img: imgJim,
  },
  {
    actor: "Jenna Fischer",
    name: "Pam Beasly",
    img: imgPam,
  },
  {
    actor: "Rainn Wilson",
    name: "Dwight Schrute",
    img: imgDwight,
  },
];

type CharacterProps = {
  character: CharacterData;
  votes: VoteInfo;
  voted: boolean;
  setVoted: React.Dispatch<boolean>;
};

const Character: React.FC<CharacterProps> = ({
  character: { name, actor, img },
  votes,
  voted,
  setVoted,
}) => {
  const { voteText } = useLanguage().translation;
  const [selected, setSelected] = useState(false);
  const select = () => {
    setVoted(true);
    setSelected(true);
  };

  useEffect(() => {
    if (!voted) {
      setSelected(false);
    }
  }, [voted]);
  let cardStyle = "rounded overflow-hidden shadow";
  if (!voted) {
  } else if (selected && votes.winner) {
    cardStyle += " border-4 border-yellow-400";
  } else if (selected) {
    cardStyle += " border-4 border-red-400";
  }

  let votedBtnStyle = selected
    ? "bg-green-500 w-full hover:shadow py-2 rounded font-semibold text-white text-sm"
    : "bg-gray-200 w-full hover:shadow py-2 rounded font-semibold text-gray-600 text-sm";

  return (
    <div className={cardStyle}>
      <img className="w-full" style={{ maxHeight: 400 }} alt={name} src={img} />
      <div className="pt-3 px-5 pb-5">
        <div>
          <h1 className="text-xl inline">{name}</h1>
          {votes.winner && voted && (
            <img
              className="inline float-right align-middle"
              src={trophy}
              alt="trophy icon"
            />
          )}
        </div>
        <div className="my-2">
          <Pill>{actor}</Pill>
        </div>
        <div>
          {!voted && (
            <button
              className="bg-blue-500 hover:bg-blue-600 w-full hover:shadow py-2 rounded font-semibold tracking-wider text-white text-sm"
              onClick={select}
            >
              {voteText}
            </button>
          )}
          {voted && (
            <button disabled={true} className={votedBtnStyle}>
              {votes.count} votes / {votes.percentage}%
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type VoteInfo = {
  percentage: number;
  count: number;
  winner: boolean;
};

const Vote = () => {
  const { favouriteCharacterText } = useLanguage().translation;
  const [voted, setVoted] = useState(false);
  const votes: number[] = [...Array(4)].map(() => Math.random() * 1000);
  const votesMax = Math.max(...votes);

  const votesTotal: number = votes.reduce((acc, v) => acc + v, 0);
  const votesInfo: VoteInfo[] = votes.map((count) => {
    return {
      percentage: Math.round((count / votesTotal) * 100),
      count: Math.round(count),
      winner: count === votesMax,
    };
  });

  return (
    <div className="mt-5">
      <h1 className="text-3xl">{favouriteCharacterText}</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
        {characters.map((character, i) => (
          <Character
            key={i}
            character={character}
            votes={votesInfo[i]}
            voted={voted}
            setVoted={setVoted}
          />
        ))}
      </div>
      {voted && (
        <button className="text-blue-500 mt-3" onClick={() => setVoted(false)}>
          Recount!
        </button>
      )}
    </div>
  );
};

export default Vote;
