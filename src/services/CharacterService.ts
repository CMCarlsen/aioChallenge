// name: filter by the given name.
// status: filter by the given status (alive, dead or unknown).
// species: filter by the given species.
// type: filter by the given type.
// gender: filter by the given gender (female, male, genderless or unknown).
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

const buildUrl = () => {};

const fetchUrl = () => {};

export { buildUrl, fetchUrl };
