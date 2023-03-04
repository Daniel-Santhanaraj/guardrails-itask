# FROM node:10 AS dashboard-build
# WORKDIR /usr/src/app
# COPY dashboard/ ./dashboard/
# RUN cd dashboard && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /usr/src/app
COPY api/package*.json ./api/
COPY api/ ./api/
RUN cd api && npm install
EXPOSE 3001
RUN npm run start

# WORKDIR /root/
# COPY --from=dashboard-build /usr/src/app/dashboard/build ./dashboard/build
# COPY api/package*.json ./api/
# COPY api/ ./api/

# RUN cd api && npm install
# RUN npm run start

# EXPOSE 3001

# CMD ["node", "./api/server.js"]