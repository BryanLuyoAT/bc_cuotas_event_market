FROM node:20.10
WORKDIR /app
COPY package*.json ./
RUN npm install pm2 -g

#agrega el bash
ADD script.sh /root/script.sh
RUN chmod 0644 /root/script.sh


# instalar cront
RUN apt-get update
RUN apt-get -y install cron

# instalar mysql 
RUN apt-get -y install mysql-server

# cront job
RUN crontab -l | { cat; echo "*/1 * * * * bash /root/script.sh"; } | crontab -

COPY . .
EXPOSE 3000

CMD [ "node", "server_.js" ]