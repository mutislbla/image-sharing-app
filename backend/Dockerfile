FROM node:18.14.2-alpine3.17

WORKDIR image-sharing-app/backend/index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]