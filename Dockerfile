FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-deps --force

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]