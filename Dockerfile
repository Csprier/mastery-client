FROM node:16.14-alpine
# WORKDIR /home/cpdev/mastery/mastery-client
WORKDIR /home/app
COPY . .
COPY package.json ./
COPY package-lock.json ./
RUN npm i -f
COPY . ./
CMD ["npm", "start"]