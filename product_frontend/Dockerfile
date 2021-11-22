FROM node:10

RUN npm install -g create-react-app

WORKDIR /app

COPY ./app /app

EXPOSE 3000

RUN cd /app

CMD [ "npm", "start" , "-a", "localhost","--port", "3000"]