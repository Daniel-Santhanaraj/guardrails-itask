# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["npm", "start"]

# Creates a "dist" folder with the production build
#RUN npm run start

# Start the server using the production build
#CMD [ "node", "dist/src/main.js" ]
