CONFIG = {}; //Make this global to use all over the application

CONFIG.APP = process.env.APP || 'development';
CONFIG.PORT = process.env.PORT || '5000';

CONFIG.DB_URI = process.env.DB_URI;
