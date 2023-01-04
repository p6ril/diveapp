FROM alpine:edge

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID

# the -D flag in the adduser command is equivalent to --disabled-password
# https://wiki.alpinelinux.org/wiki/Setting_up_a_new_user#Options

RUN addgroup -g $GROUP_ID $USER_NAME && \
    adduser -D -u $USER_ID -G $USER_NAME $USER_NAME && \
    mkdir /home/$USER_NAME/dive-app && \
    apk add --no-cache nodejs npm && \
    npm install -g npm@latest \
    npm install -g serve

WORKDIR /home/$USER_NAME/dive-app

COPY build .

USER $USER_NAME

EXPOSE 3000

CMD ["serve", "-s", "."]
