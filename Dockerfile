FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install -g npm@latest

COPY . .

RUN npm run build

COPY .next ./.next

CMD ["npm", "run", "dev"]