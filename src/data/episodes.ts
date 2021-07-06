import episodesData from "data/episodes.json";

export type EpisodeData = {
  title: string;
  description: string;
  writer: {
    name: string;
    role: string;
  };
  director: {
    name: string;
    role: string;
  };

  aired: Date;
};

const episodes: EpisodeData[] = (episodesData.data as any[]).map((episode) => {
  const newEpisode: EpisodeData = episode;
  newEpisode.aired = new Date(episode.airDate);
  return newEpisode;
});

const seasons = [episodes.slice(0, 6), episodes.slice(6)];

export { episodes, seasons };
