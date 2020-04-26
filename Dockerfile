FROM node:14

RUN npm install -g nodemon

EXPOSE 8080

WORKDIR /usr/local/src/api-code/

ADD node-entrypoint.sh .

CMD ["./node-entrypoint.sh"]