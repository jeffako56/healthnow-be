# healthnow-be

healthnow exam for backend and simple frontend

//to run
//cd ~ /healthnow-backend

//to install clients/FE packages
cd client npm install

//to run both FE and BE
npm run start

//to run BE only
npm run server

//to run FE only
npm run client

//to run api test
npm run test

//setup database by creating new schema named (healthnow_db)

//to add tables
knex migrate:latest

//to seed user
knex seed:run
