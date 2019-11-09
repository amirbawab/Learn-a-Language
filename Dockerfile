FROM node:12.13.0
WORKDIR /usr/src/app

COPY ./application ./application
COPY ./server ./server

RUN cd ./application && npm install
RUN cd ./server && npm install

EXPOSE 3000
EXPOSE 3001

CMD ./run_app.sh
