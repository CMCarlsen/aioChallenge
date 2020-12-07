export interface Info {
  count: number,
  pages: number,
  next: string|null,
  prev: string|null,
};

export interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string,
  },
  location: {
    name: string,
    url: string
  },
  image: string,
  episode?: string[],
  url: string,
  created: string,
};

interface CharacterServResp {
  info: Info,
  characterList: Character[],
};

interface SearchParameters {
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
}

const baseUrl = 'https://rickandmortyapi.com/api/character';

const buildUrl = (page: number, parameters: Partial<SearchParameters>) => {
  // in build url
  let url = `${baseUrl}/?page=${page || 1}`;

  for(const [k, v] of Object.entries(parameters)) {
    url += `&${k}=${v}`;
  }

  return url;
};

const fetchCharacterList = async (url: string) => {
  // Fetching stuff
  const result = await fetch(url);
  const json = await result.json();

  const { info, results: characterList } = json

  return { info, characterList } as CharacterServResp;
};

export { buildUrl, fetchCharacterList };
