FROM python:3
WORKDIR /grocery_list
RUN mkdir frontend
COPY frontend/package.json ./frontend
COPY requirements.txt /grocery_list/
COPY run.sh .
RUN chmod +x ./run.sh
RUN ./run.sh
COPY . .