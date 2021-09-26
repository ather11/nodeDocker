FROM node:latest
WORKDIR /home/genre
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5000

CMD npm run dev
