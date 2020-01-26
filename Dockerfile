FROM node:10.13-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --only=dev
ENV NODE_ENV production
ENV POSTGRES_DATABASE <production database>
ENV POSTGRES_USER <prudction database user>
ENV POSTGRES_PASSWORD <production password>
ENV POSTGRES_HOST <production databse host>
ENV POSTGRES_PORT <production database port>
ENV APP_PORT <production database port>
COPY . .
RUN npm run migration
RUN npm run seed 
EXPOSE 3000
CMD npm run start
