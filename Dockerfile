FROM node:lts-alpine
WORKDIR /home/cpdev/mastery/mastery-client
COPY . .
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]