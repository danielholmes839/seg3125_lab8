export type WatchPartyData = {
  title: string;
  location: string;
  date: Date;

  season: number;
  episode: number;
  owner: boolean;
};

export const parties: WatchPartyData[] = [
  {
    title: "Epic Watch Party 1",
    location: "Ottawa, Canada",
    date: new Date("2011-04-11T10:20:30Z"),
    season: 0,
    episode: 0,
    owner: false,
  },
  {
    title: "Epic Watch Party 2",
    location: "Toronto, Canada",
    date: new Date("2011-04-11T10:20:30Z"),
    season: 0,
    episode: 5,
    owner: false,
  },
  {
    title: "Epic Watch Party 3",
    location: "Tabaret Hall, Ottawa, Canada",
    date: new Date("2011-04-11T10:20:30Z"),
    season: 1,
    episode: 0,
    owner: false,
  },
];
