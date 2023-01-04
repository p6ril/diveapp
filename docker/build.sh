cd ..
docker build -f docker/Dockerfile -t dive-app:1.0.2 \
       --build-arg USER_ID=$(id -u) \
       --build-arg USER_NAME=$(id -un) \
       --build-arg GROUP_ID=$(id -g) .
