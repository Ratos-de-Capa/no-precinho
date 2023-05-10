## NGINX
FROM nginx:1.13-alpine

LABEL author="João Leâo"

COPY ./nginx.dev.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]