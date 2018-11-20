FROM node:latest
MAINTAINER AICI Lyes

# set working directory
RUN mkdir /app
WORKDIR /app


# install and cache app dependencies
COPY . .
RUN cd ./back && yarn && yarn build
RUN cd ./front && yarn

# Expose port
EXPOSE 3000 8080

# start app
CMD ["yarn", "start"]