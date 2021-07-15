import React from "react";
import { useState } from "react";
import { EpisodeData, seasons } from "data/episodes";
import EpisodePagination from "components/EpisodePagination";
import { formatDate } from "helpers";
import { useLanguage } from "./LanguageContext";

type Props = { season: number; number: number; episode: EpisodeData };

const Episode: React.FC<Props> = ({
  season,
  number,
  episode: { title, description, aired, director, writer },
}) => {
  return (
    <div className="rounded overflow-hidden shadow py-5 px-7">
      <h1 className="text-xl">
        S{season}:E{number} {title}
      </h1>
      <div className="my-2">
        <span className="inline-block text-xs bg-blue-100 py-1 px-3 mr-2 font-semibold shadow-xs rounded-full">
          {director.role} {director.name}
        </span>
        <span className="inline-block text-xs bg-blue-100 py-1 px-3 font-semibold shadow-xs rounded-full">
          {writer.role} {writer.name}
        </span>
      </div>
      <p className="text-sm">
        {formatDate(aired)} - {description}
      </p>
    </div>
  );
};

const Episodes: React.FC = () => {
  // Episodes component renders all episodes, pagination,
  const { seasonText, episodeText } = useLanguage().translation;
  const [season, setSeason] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const seasonEpisodes = seasons[season];
  const pageSize = 6;
  const pageCount = Math.ceil(seasonEpisodes.length / pageSize);
  const seasonPageEpisodes = seasonEpisodes.slice(
    pageSize * page,
    pageSize * page + pageSize
  );

  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">{episodeText}</h1>
        <select
          className="w-52 p-1 my-3 mr-5 rounded text-lg border border-gray-100 focus:outline-none hover:shadow-sm"
          onChange={(e) => {
            setSeason(parseInt(e.target.value));
            setPage(0);
          }}
        >
          <option value={0}>{seasonText} 1</option>
          <option value={1}>{seasonText} 2</option>
        </select>

        {pageCount > 1 && (
          <EpisodePagination
            pageCount={pageCount}
            page={page}
            setPage={setPage}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {seasonPageEpisodes.map((episode, i) => (
          <Episode
            key={i}
            season={season + 1}
            number={page * pageSize + i + 1}
            episode={episode}
          />
        ))}
      </div>
    </div>
  );
};

export default Episodes;
