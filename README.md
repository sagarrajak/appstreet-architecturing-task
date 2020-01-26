# APPSTREET BACKEND TASK

# how to setup?
  - go to env folder 
  - created four file name 
  - development.env
  - production.env
  - testing.env
  - node_env.env
    then edit the node_env.env file and put 
    NODE_ENV=development for development environment
    NODE_ENV=production for production environment 
    NODE_ENV=testing  for testing environment 

### working in development environment  in local pc
    NODE_ENV=development in env/node_env.env file 
 - put the following environment variable 
 - POSTGRES_DATABASE=<database name>
 - POSTGRES_USER=<database user>
 - POSTGRES_PASSWORD=<database password>
 - POSTGRES_HOST=<databse host>
 - POSTGRES_PORT=<database port default 5432> 
 - APP_PORT=<application running port, default 3000>
 - now you are alomost ready for development environment 
 - run "npm i" 
 - run "npm run migration"
 - run "npm run seed"
 - run "npm run dev"

### working in development environment with docker 
- environment variable could be passed by ***dev.Dockerfile*** or set in ***env/development.env***  
- currently in development docker container we have to use  ***env/development.env***
- run ***npm run build:dev***
- run ***npm run build:dev:run***

 
### working in production environment for local pc  
    NODE_ENV=production in env/node_env.env file
 - put the following environment variable 
 - POSTGRES_DATABASE=<database name>
 - POSTGRES_USER=<database user>
 - POSTGRES_PASSWORD=<database password>
 - POSTGRES_HOST=<databse host>
 - POSTGRES_PORT=<database port default 5432> 
 - APP_PORT=<application running port, default 3000>
 - now you are alomost ready for development environment 
 - run **npm i** 
 - run ***npm run migration***
 - run ***npm run seed***
 - run ***npm run dev***
 
### working in production environment with docker
 - for production docker container we have to set environment variable in **Dockerfile** 
 - just set enviroment variable  in **Dockerfile** 
 - run **npm run build:prod** for building production docker container   
 - run **npm run build:prod:run** for building and running in production docker container  
 - default port maping is ***3000 to 3000*** application port and server port 
 