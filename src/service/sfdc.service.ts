import { getToken } from 'sf-jwt-token';
import * as jsforce from 'jsforce';
import { getSFDCSecrets } from './secrets.service';

const INSTANCE_URL = 'https://smoothstack.my.salesforce.com';

export const getSFDCConnection = async () => {
  const { CONSUMER_KEY, USER_NAME, PRIVATE_KEY } = await getSFDCSecrets();
  const options = {
    iss: CONSUMER_KEY,
    privateKey: Buffer.from(PRIVATE_KEY, 'base64').toString('utf8'),
    sub: USER_NAME,
    aud: 'https://login.salesforce.com',
  };

  const { access_token } = await getToken(options);
  const conn = new jsforce.Connection();
  conn.initialize({
    instanceUrl: INSTANCE_URL,
    accessToken: access_token,
  });
  return conn;
};

export const fetchJobManagementAllowedEmails = async (conn: any): Promise<string[]> => {
  try {
    const { records } = await conn.query(
      `SELECT Allowed_Domains__c FROM Contractor_Xchange_Portal_Settings__mdt WHERE DeveloperName = 'Settings'`
    );
    const emailList = JSON.parse(records[0].Allowed_Domains__c);
    return emailList;
  } catch {
    console.log('Error fetchJobManagementAllowedEmails');
    return [];
  }
};
