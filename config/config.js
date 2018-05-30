CONFIG = {}; //Make this global to use all over the application

CONFIG.APP = process.env.APP || 'development';
CONFIG.PORT = process.env.PORT || '5000';

CONFIG.DB_URI = process.env.DB_URI;

if (!CONFIG.DB_URI) {
  throwError(
    'DB_URI is not defined. Please add DB_URI=[value] to the .env file in the root of this project.',
    true
  );
}

// Argon configuration
CONFIG.ARGON_TIMECOST = process.env.ARGON_TIMECOST || 40;
CONFIG.ARGON_MEMORY = process.env.ARGON_MEMORY || 128000;
CONFIG.ARGON_PARALLELISM = process.env.ARGON_PARALLELISM || 4;

CONFIG.JWT_ENCRYPTION = process.env.JWT_ENCRYPTION;
CONFIG.JWT_EXPIRATION = process.env.JWT_EXPIRATION;
