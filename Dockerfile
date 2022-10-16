FROM python:3
WORKDIR /grocery_list
COPY requirements.txt /grocery_list/
COPY run.sh /grocery_list/
RUN chmod +x run.sh
RUN run.sh
COPY . .