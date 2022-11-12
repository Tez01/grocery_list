# grocery_list
![](https://github.com/Tez01/grocery_list/blob/main/demo.gif)

A grocery list maker responsive web application developed using React framework for the frontend and Django framework for the backend. The data is saved in a PostgreSQL database. The application is hosted on Heroku.

# Installation instruction
1. Clone the repository from github.
2. Make sure you have docker and python3 installed.
3. Create a python virtual environment and activate it.
4. Go the directory of cloned repo and run `docker-compose up`. This command is enough for setting up the
complete virtual environment
5. Whenever new python libraries are required, the exact version can be translated to requirements.txt file using `pip freeze` command. After this, you would have to stop the container and build it again using `docker-compose up --build`.
6. Whenever new npm libraries are required they can be added to package.json file in the frontend folder. After this, you would have to stop the container and build it again using `docker-compose up --build`.
# Troubleshooting
The docker container has to run two processes once everything is setup: run the webpack and run the django server. However, both the processes consume the terminal and one of them has to be run in background. For this the command `RUN nohup npm --prefix frontend/ run dev&` was added in Dockerfile to run webpack in background. This works for most systems. However, if you don't see changes in the frontend app in your browser, the reason might be that webpack was not started properly. To mitigate this, follow the following steps:
- Get the id of the running container using `docker ps`
- Use the command `docker exec -it <container-id> /bin/bash` to go inside the container.
- `cd` to `frontend` directory.
- Run the webpack manually using `npm run dev`.
- It is a one time process and now the changes should be visible in the browser

# Data Model
![](https://github.com/Tez01/grocery_list/blob/main/Data-Flow.svg)
