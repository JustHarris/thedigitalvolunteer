const development = {
  database: 'thedigitalvolunteer',
  username: 'thedigitalvolunteer',
  password: 'ZqXrvu8Gi2TUC6H9FLr-wLHYhZ_WUxeGjLuH*tBjVKzbJjTKGy',
  host: 'api-db',
  dialect: 'mysql',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'api-db',
  dialect: 'mysql',
};

export default {
  development,
  production,
};
