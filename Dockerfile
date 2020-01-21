# build stage
FROM node:alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]