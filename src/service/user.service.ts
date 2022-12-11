import axios from 'axios';
import { getMSAuthData, MS_GQL_ENDPOINT } from './auth/microsoft.oauth.service';

export const retrieveUsers = async () => {
  const { token } = await getMSAuthData();
  const { data } = await axios.get(`${MS_GQL_ENDPOINT}users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.value;
};
