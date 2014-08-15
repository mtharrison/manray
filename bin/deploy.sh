docker build -t mtharrison/manray .
docker push mtharrison/manray
ssh manray 'sudo docker kill $(sudo docker ps -q)'
ssh manray 'sudo docker pull mtharrison/manray'
ssh manray 'sudo docker run -p 80:80 -d -v /home/ubuntu/logs:/home/ubuntu/logs mtharrison/manray'