import axios from 'axios';
import { getMSAuthData, MS_GQL_ENDPOINT } from './auth/microsoft.oauth.service';

export const retrieveUsers = async () => {
  const { token } = await getMSAuthData();
  let users = [];
  let nextPageLink = undefined;
  const getDataPage = async () => {
    try {
      let url = `${MS_GQL_ENDPOINT}users?$top=100&$select=displayName,givenName,surname,jobTitle,mail,mobilePhone,accountEnabled`;
      if (nextPageLink) url = nextPageLink;
      console.log('url', url);
      return await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log('Error', e);
    }
  };

  while (true) {
    const { data } = await getDataPage();
    users.push(...data.value);
    nextPageLink = data['@odata.nextLink'];
    if (!data['@odata.nextLink']) break;
  }
  return users.filter((user: any) => !!user.accountEnabled);
};
