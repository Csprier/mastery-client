FROM node:lts-alpine
WORKDIR /home/cpdev/mastery/mastery-client
COPY . .
COPY package.json ./
COPY package-lock.json ./
RUN yarn install
COPY . ./
CMD ["yarn", "start"]