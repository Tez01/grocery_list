FROM python:3
WORKDIR /grocery_list
RUN mkdir frontend
COPY frontend/package.json ./frontend
RUN apt-get update 
RUN apt-get install -y nodejs npm
RUN npm install frontend/
COPY requirements.txt /grocery_list/
RUN pip3 install -r requirements.txt
COPY . .