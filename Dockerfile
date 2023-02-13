# I always forget these so here goes:
# docker build -t eu.gcr.io/small-services-no-project/nord-pool-app-backend .
# docker run -p 8080:8080 eu.gcr.io/small-services-no-project/nord-pool-app-backend
# docker push eu.gcr.io/small-services-no-project/nord-pool-app-backend
# gcloud run deploy --image eu.gcr.io/small-services-no-project/nord-pool-app-backend


# Build dependencies
FROM node:18.12.1-alpine as dependencies
WORKDIR /app
COPY package.json .
RUN npm i
COPY index.js .

# Build production image
EXPOSE 8080
CMD npm run start
