FROM node:latest
MAINTAINER AICI Lyes

# set working directory
RUN mkdir /app
WORKDIR /app


# install and cache app dependencies
COPY . .
RUN yarn build

# Expose port
EXPOSE 80

# start app
CMD ["yarn", "serve"]