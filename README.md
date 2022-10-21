# grocery_list
A grocery list maker responsive web application was developed using React framework for the frontend and Django framework for the backend. The data is saved in a PostgreSQL database. The application is hosted on Heroku which can be accessed by following the link [here](https://grocery-list-maker-app.herokuapp.com/). 

# Installation instruction
1. Clone the repository from github from this url.
2. Make sure you have docker and python3 installed.
3. Create a python virtual environment and activate it.
4. Go the directory of cloned repo and run docker-compose up. This command is enough for setting up the
complete virtual environment
5. Whenever new python libraries are required, the exact version can be translated to requirements.txt file using pip freeze command. After this, you would have to stop the container and build it again using docker-compose up --build.
6. Whenever new npm libraries are required they can be added to package.json file in the frontend folder. After this, you would have to stop the container and build it again using docker-compose up --build.
