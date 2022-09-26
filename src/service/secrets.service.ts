import { SecretsManager } from 'aws-sdk';
import { MicrosoftCredentials } from 'src/model/MicrosoftCredentials';
import { SalesforceCredentials } from 'src/model/SalesforceCredentials';

export const getMSSecrets = async (): Promise<MicrosoftCredentials> => {
  const secretPath = 'smoothstack/microsoft-credentials';
  const client = new SecretsManager({
    region: 'us-east-1',
  });

  const res = await client.getSecretValue({ SecretId: secretPath }).promise();
  return JSON.parse(res.SecretString);
};

export const getSFDCSecrets = async (): Promise<SalesforceCredentials> => {
  const secretPath = 'smoothstack/salesforce-credentials';
  const client = new SecretsManager({
    region: 'us-east-1',
  });

  const res = await client.getSecretValue({ SecretId: secretPath }).promise();
  return JSON.parse(res.SecretString);
};
