FROM node:14

EXPOSE 3000
COPY . ./
RUN npm i && npm run build
CMD npm start
