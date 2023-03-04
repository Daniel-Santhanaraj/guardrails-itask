FROM node:10 AS dashboard-build
WORKDIR /usr/src/app
COPY dashboard/ ./dashboard/
RUN cd dashboard && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=dashboard-build /usr/src/app/dashboard/build ./dashboard/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.js ./api/

EXPOSE 3080

CMD ["node", "./api/server.js"]