# Overview
Frontend for Food Diary application written in React

# Instructions
This component is meant to be used in conjunction with the fooddiary-backend project.
Please check out that project after following the instructions below and use docker-compose to deploy this application properly.

Firstly, build the app and generate the `build` folder by running `yarn install` followed by `yarn build` at the root of the project folder.
Then run `docker build -t fdfrontend .` at the project root to build the docker image for the frontend.

Continue with the deployment by running `docker-compose up` at the root of the `fooddiary-backend` folder.
