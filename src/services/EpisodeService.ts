export interface Episode {
  id?: number,
  name: string,
  air_date?: string,
  episode?: string,
  characters?: Array<string>,
  url?: string,
  created?: string,
};

const fetchEpisodeData = async (url: string) => {
  if(url) {
    const result = await fetch(url);
    const json = await result.json();

    debugger

    return { ...json } as Episode;
  }

  return { name: 'Unknown' } as Episode;
};

export { fetchEpisodeData };
