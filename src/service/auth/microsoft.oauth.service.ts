import * as msal from '@azure/msal-node';
import { MSAuthData } from 'src/model/MSAuthData';
import { getMSSecrets } from '../secrets.service';

export const MS_GQL_ENDPOINT = 'https://graph.microsoft.com/v1.0/';

export const getMSAuthData = async (): Promise<MSAuthData> => {
  const { CLIENT_ID, CLIENT_SECRET, AUTHORITY, CALLBACK_URL } = await getMSSecrets();
  const msalConfig = {
    auth: {
      clientId: CLIENT_ID,
      authority: AUTHORITY,
      clientSecret: CLIENT_SECRET,
    },
  };
  const cca = new msal.ConfidentialClientApplication(msalConfig);
  const result = await cca.acquireTokenByClientCredential({ scopes: ['https://graph.microsoft.com/' + '.default'] });
  return {
    token: result.accessToken,
    callBackUrl: CALLBACK_URL,
  };
};
