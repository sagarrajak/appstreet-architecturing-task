FROM node:10.13-alpine
ENV NODE_ENV development
ENV APP_PORT 3000
WORKDIR  /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --only=dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
