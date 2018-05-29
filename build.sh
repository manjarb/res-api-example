#!/bin/bash
# sh build.sh testing

if [ ! $1 ]; then
    echo "Please provide the env. eg['testing','prod']"
    exit
fi

echo "build typescript"
npm run build

export BUILDNUMBER=`date +%Y%m%d%H%M`

echo "Building rest-api-example version $BUILDNUMBER..."
docker build --rm -t rest-api-example:$BUILDNUMBER -f env/$1/Dockerfile .

echo "Running rest-api-example version $BUILDNUMBER..."
docker run -d -t --name rest-api-example -p 8500:8500 rest-api-example:$BUILDNUMBER

echo $BUILDNUMBER > version.txt