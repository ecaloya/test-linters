# syntax=docker/dockerfile:1
FROM node:18-bullseye
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g eslint
RUN npm install -g stylelint
CMD ["/bin/sleep","3600"]
EXPOSE 3000