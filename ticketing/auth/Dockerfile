FROM node:18.6.0-alpine3.16
# set working DIR to /app
WORKDIR /app
# copy just the package.json so that we can run the dependency 
COPY package.json . 
# install all dependency
RUN npm install --only=prod
# Copy all inside our project dir to /app dir
COPY . . 

# run the start command when all the processes above is done

CMD ["npm","start"]
