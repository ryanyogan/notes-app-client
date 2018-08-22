const dev = {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'notes-app-2-api-dev-attachmentsbucket-tyx1b2hoe91v',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://p1q6d3bqj5.execute-api.us-east-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_Jsdk6BjIh',
    APP_CLIENT_ID: '74ahpckc1coeu5gv66pkd5jg4e',
    IDENTITY_POOL_ID: 'us-east-1:0cb9621d-586e-4b62-bd9c-ae091d22c543',
  },
};

const prod = {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'notes-app-2-api-prod-attachmentsbucket-174c2gjnnfxbi',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://93gfk86bi3.execute-api.us-east-1.amazonaws.com/prod',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_HqFKtukRk',
    APP_CLIENT_ID: '3f3536b2r9ns2n2jeukp0bvoq',
    IDENTITY_POOL_ID: 'us-east-1:5f865aab-9d9e-41fd-b855-acaa818b3929',
  },
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
