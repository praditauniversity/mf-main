FROM node:18-alpine3.15

COPY ./package.json /tmp/package.json
RUN cd /tmp && yarn
RUN yarn add --save webpack-dev-server axios react-router-dom cors --verbose
RUN mkdir -p /frontend
RUN cp -r /tmp/node_modules /frontend
RUN mkdir /frontend/node_modules/.cache && chmod -R 777 /frontend/node_modules/.cache

WORKDIR /frontend
ADD . .

EXPOSE 5001
ENTRYPOINT HOST=0.0.0.0 yarn start --port 5001