# currency-converter API

Thank you for taking out the time to review this test. 

To run the project locally on your computer. You just need to clone the project and then make sure you have Node.js and npm installed.
Before you run, make sure you have an .env file. Which you can make by copying and pasting .env.example file, where you need to add your API Key for it to work. Just make sure you keep the Redis url for local machine and not docker.
Before you run, you also need to make sure you have redis installed and need to run the redis server by running the command "redis-server".
You go to the server directory in the terminal by writing: "cd server" and then "npm install" to install the dependencies. After which you run "npm run dev" to run the API in development mode. 

Now you can test if the server is working by going to http://localhost:8000/test. If you have started everything correctly, you should get "Server is Working".

If you want to convert a currency you go to the following URL: "http://localhost:8000/convert" and then add your query at the end of it. For example: http://localhost:8000/convert?from=PKR&to=GBP&amount=100. There are 3 values you need to give for it to work properly. From, to, amount. From is the currency you want to convert, you can also call it your base currency. To is the currency you want results in. And amount is the amount you wanted to be converted. 

You cannot leave any of these 3 values empty. And you need to make sure you write the correct ISO 4217 Code of the currencies. For example: USD, EUR, GBP, TRY, PKR and so on. 


DOCKER: 

If you want to run the project using docker, just need to make sure you have docker installed and also have docker-compose installed. You just go into the server folder and write "docker compose up --build". Make sure you check out .env example file and keep the redis URL for docker and not the one for local machine. You also need to have an API key generated for your Influx DB and user credentials, which you will make once you launch the container.

InfluxDB:
The influxDB is working on http://localhost:8086 where you can go sign up (make username and password) and then make an organization and then a bucket for that org which you will use to save data collected from the express app. I'm using telegraf to collect system data and then save it onto influx. 

Grafana: 
You can access grafana on the default localhost:3000
For Grafana, you need first need to sign in with the default credentials: 
username: admin
password: admin

It is recommended to change the password to something else. 

And then you can pull data from influx and make dashboards. But you need to first setup connecion with influx. 
For that: 
1. Go to Connections from the left menu.
2. Click on Add Data Source and search influxDB
3. In the data fields. Give it a proper name.
4. In the Query Language select Flux.
5. The URL should be: http://influxdb:8086 as it is a seperate container in Docker so we reference the hostname with the docker container name.
6. Next add Organization name (mine is set to Everva).
7. Click on Save and test and it should say there are 3 buckets found.

8. Go to Dashboards and click on New to create a dashboard from the imported data.
9. Click on Add visualization, then select the influxdb as the data source. Then you need to add in the query of the data field you want to visualize. One way is to go to Influx and visually select filters to select data fields and copy the query from the query builder there and paste it inside grafana. Then add the labels to make sense of the data and range. And then click on apply and save to save the dashboard. 


FRONTEND:
The frontend is created in Vue using the vuetify component library. The web application can be accessed on localhost:8080.
The Application is intentionally not containerized with docker because we usually have different places of deployment for the frontend and backend so it's a good idea to decouple them (according to single responsibility principle). so just go into the frontend application, correctly set the url of the backend and run the frontend using "npm run serve" if you want to run it in dev mode. And for production do npm run build and then serve the build file using nginx, apache or a CDN. 




