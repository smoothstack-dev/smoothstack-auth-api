import type { AWS } from '@serverless/typescript';

import jobManageAllowedEmailList from '@functions/jobManageAllowedEmailList';

const serverlessConfiguration: AWS = {
  service: 'smoothstack-auth-api',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-offline-sns', 'serverless-ngrok-tunnel'],
  package: { individually: true },
  custom: {
    ngrokTunnel: {
      tunnels: [
        {
          port: 3000,
        },
      ],
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
    'serverless-offline-sns': {
      port: 4002,
      debug: false,
      accountId: '${opt:aws_account, env: AWS_ACCOUNT}',
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    memorySize: 1024,
    timeout: 30,
    stage: '${opt:stage, env:STAGE}',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['multipart/form-data'],
    },
    iam: {
      role: 'arn:aws:iam::${opt:aws_account, env: AWS_ACCOUNT}:role/${opt:lambda_role, env:LAMBDA_ROLE}',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      AWS_ACCOUNT: '${opt:aws_account, env: AWS_ACCOUNT}',
      ENV: '${opt:stage, env:STAGE}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    jobManageAllowedEmailList,
  },
  // This is for SNS
  // resources: {
  //   Conditions: {
  //     isLocal: {
  //       'Fn::Equals': ['${self:provider.stage}', 'local'],
  //     },
  //   },
  //   Resources: {
  //     ...snsResources,
  //   },
  // },
};

module.exports = serverlessConfiguration;
