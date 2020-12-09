export interface Location {
  id?: number,
  name: string,
  type?: string,
  dimension?: string,
  residents?: string[],
  url?: string,
  created?: string,
};

const fetchLocationData = async (url: string) => {
  if(url) {
    const result = await fetch(url);
    const json = await result.json();

    return { ...json } as Location;
  }

  return {  name: 'Unknown' } as Location;
};

export { fetchLocationData };
