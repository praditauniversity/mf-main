FROM node:18-alpine3.15

COPY ./package.json /tmp/package.json
RUN cd /tmp && yarn
RUN yarn add webpack-dev-server
RUN mkdir -p /frontend
RUN cp -r /tmp/node_modules /frontend
RUN mkdir /frontend/node_modules/.cache && chmod -R 777 /frontend/node_modules/.cache

WORKDIR /frontend
ADD . .

EXPOSE 20000
ENTRYPOINT yarn start