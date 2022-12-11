import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { retrieveUsers } from 'src/service/user.service';

const users = async (event: APIGatewayEvent) => {
  const method = event.httpMethod.toUpperCase();
  console.log('retrieve user list', method);
  switch (method) {
    case 'GET':
      return await retrieveUsers();
    default:
      return {
        statusCode: 400,
        body: 'Incorrect HTTP request',
      };
  }
};

export const main = middyfy(users);
