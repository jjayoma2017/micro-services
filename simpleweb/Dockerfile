#Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some dependencies
# copy dependency like the package.json
COPY ./ ./
RUN npm install

#Default command
CMD ["npm","start"]