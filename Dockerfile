FROM ubuntu:14.04

RUN apt-get update -y
RUN apt-get install wget -y
RUN apt-get install bzip2 -y
RUN wget -P /home/ubuntu http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz
RUN cd /home/ubuntu && tar -xvzf /home/ubuntu/node-v0.10.30-linux-x64.tar.gz
RUN apt-get install libfontconfig -y

RUN mkdir -p /var/www/tmp
RUN mkdir -p /var/www/images

ADD . /var/www

RUN cd /var/www && /home/ubuntu/node-v0.10.30-linux-x64/bin/npm install

EXPOSE 80

CMD cd /var/www && /home/ubuntu/node-v0.10.30-linux-x64/bin/node /var/www/index
