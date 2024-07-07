import mapRepository from '@/apis/restaurant/review/map';
import { useQuery } from '@tanstack/react-query';

type LatLng = {
  lat: number;
  lng: number;
};

const useMapDataQuery = ({ lat, lng }: LatLng) => {
  const { data } = useQuery(['map', lat, lng], () => mapRepository().getMapList({ lat, lng }));

  return data;
};

export default useMapDataQuery;
