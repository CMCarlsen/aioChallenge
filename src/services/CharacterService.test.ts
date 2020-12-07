import { buildUrl, fetchCharacterList } from "./CharacterService";

test('Should build url correctly', () => {
  const page = 1;
  const parameters = {
    name: 'Test Name',
    status: 'alive',
    species: 'Human',
    type: 'Pickle',
    gender: 'Unknown',
  };
  let result = buildUrl(page, parameters);
  expect(result).toBe('https://rickandmortyapi.com/api/character/?page=1&name=Test Name&status=alive&species=Human&type=Pickle&gender=Unknown');
});

test('Should fetch data from API', async function() {
  const testUrl = 'https://rickandmortyapi.com/api/character/?page=1&name=Alien Googah';

  const expectedResult = {
      "info": {
          "count": 1,
          "pages": 1,
          "next": null,
          "prev": null
      },
      "characterList": [
          {
              "id": 13,
              "name": "Alien Googah",
              "status": "unknown",
              "species": "Alien",
              "type": "",
              "gender": "unknown",
              "origin": {
                  "name": "unknown",
                  "url": ""
              },
              "location": {
                  "name": "Earth (Replacement Dimension)",
                  "url": "https://rickandmortyapi.com/api/location/20"
              },
              "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
              "episode": [
                  "https://rickandmortyapi.com/api/episode/31"
              ],
              "url": "https://rickandmortyapi.com/api/character/13",
              "created": "2017-11-04T20:33:30.779Z"
          }
      ]
  }

  let result = await fetchCharacterList(testUrl);
  expect(result).toEqual(expectedResult);
});
