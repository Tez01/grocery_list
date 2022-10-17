#!/usr/bin/env bash

apt-get update 
apt-get install -y nodejs npm
cd frontend
npm install
cd ..
echo "${ls}"

