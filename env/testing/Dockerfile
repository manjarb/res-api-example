FROM node:10-alpine

MAINTAINER SARAVANA KUMAR <saravana@prenetics.com>

# Setting local time
RUN apk --update add tzdata

RUN cp /usr/share/zoneinfo/Hongkong /etc/localtime && echo Hongkong > /etc/timezone

# Copy Source code
COPY pm2.json /var/www/html/rest-api-example/
COPY package.json /var/www/html/rest-api-example/
COPY package-lock.json /var/www/html/rest-api-example/

COPY dist/src /var/www/html/rest-api-example/dist/src

WORKDIR /var/www/html/rest-api-example

# Install all dependencies.
RUN npm install --only=production --from-lock-file

# Using the port 8500.
EXPOSE 8500

CMD [ "npm", "run","testing"]