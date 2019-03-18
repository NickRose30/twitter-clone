# twitter clone

This application was built using React Redux on the frontend and Node.js on the backend with a mongo database.

To run locally:

First create a local mongo instance named ```twitter-clone```. The application connects to a local mongo instance at ```mongodb://localhost:27017/twitter-clone```. Start it up using ```mongod```. Then follow the steps below.

1. Clone the repo
2. cd to /server
3. ```npm install```
4. create a file called ```.env``` and put in it ```SECRET_KEY=abc```, replacing ```abc``` with whatever you want
5. Run ```node index.js``` (make sure it is connecting to your local mongo instance at this point)
6. cd back up to the root and then to /client 
7. ```npm install```
8. Run ```npm run start```