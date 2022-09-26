import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { fetchJobManagementAllowedEmails, getSFDCConnection } from 'src/service/sfdc.service';

const jobManageAllowedEmailList = async (event: APIGatewayEvent) => {
  const method = event.httpMethod.toUpperCase();
  console.log('validateMSCredential method', method);
  switch (method) {
    case 'POST':
      return await validateEmailList(event);
    default:
      return {
        statusCode: 400,
        body: 'Incorrect HTTP request',
      };
  }
};

const validateEmailList = async (event: APIGatewayEvent) => {
  try {
    // send logined emails to this api
    // TODO: It's currently using other meta type. Need to update it later
    const msEmail = event.queryStringParameters.email || '';
    const sfConnection = await getSFDCConnection();
    const allowedEmailList = await fetchJobManagementAllowedEmails(sfConnection);
    allowedEmailList.push('derek.chou@smoothstack.com');
    const isAllowed = allowedEmailList.includes(msEmail);
    console.log('isAllowed', msEmail, isAllowed);
    return {
      statusCode: 204,
      body: {
        isAllowed,
      },
    };
  } catch (e) {
    const errorMsg = 'Error validating validateMSCredential';
    console.error(errorMsg, e);
    return {
      statusCode: 500,
      body: errorMsg,
    };
  }
};

export const main = middyfy(jobManageAllowedEmailList);
