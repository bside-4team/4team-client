import http from '../http';

interface Req {
  latitude: number;
  longitude: number;
  address: string;
}

interface Res {
  id: string;
  name: string;
  referenceLink: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const putSaveRegion = async (req: Req, token?: string) => {
  return await http.put<Res, Req>(
    '/apis/v1/user',
    req,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
};
