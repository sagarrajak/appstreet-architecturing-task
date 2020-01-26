FROM node:10.13-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --only=dev
ENV NODE_ENV production
ENV POSTGRES_DATABASE appstreet-task
ENV POSTGRES_USER sagar
ENV POSTGRES_PASSWORD VE3b7iDn3jFLnTzHz06qyQ==
ENV POSTGRES_HOST li1469-247.members.linode.com
ENV POSTGRES_PORT 5432
ENV APP_PORT 3000
COPY . .
RUN npm run migration
RUN npm run seed 
EXPOSE 3000
CMD npm run start
