#!/usr/bin/env bash
pip3 install -r requirements.txt
apt-get update 
apt-get install -y nodejs npm
cd frontend
npm install
cd ..
echo "${ls}"

