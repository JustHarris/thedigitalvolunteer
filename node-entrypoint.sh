#!/usr/bin/env bash

until cd /usr/local/src/api-code/ && yarn -f
do
    echo "Retrying yarn build"
done

yarn start