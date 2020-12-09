export interface Location {
  id?: number,
  name: string,
  type?: string,
  dimension?: string,
  residents?: Array<string>,
  url?: string,
  created?: string,
};

const fetchLocationData = async (url: string) => {
  if(url) {
    const result = await fetch(url);
    const json = await result.json();

    debugger

    return { ...json } as Location;
  }

  return {  name: 'Unknown' } as Location;
};

export { fetchLocationData };
