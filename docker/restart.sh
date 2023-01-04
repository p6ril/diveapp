#!/usr/bin/env bash

CONTAINER_ID=$(docker container ls | grep 'dive-app' | awk '{print $1}')
IMAGE_ID=$(docker image  ls | grep 'dive-app' | awk '{print $3}')

docker container stop $CONTAINER_ID
docker image rm $IMAGE_ID

if [[ -d ../build ]]; then
  ./build.sh
  ./start.sh
else
  echo 'build directory not found.'
fi
