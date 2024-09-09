# currency-converter API

Thank you for taking out the time to review this test. 

To run the project locally on your computer. You just need to clone the project and then make sure you have Node.js and npm installed.
Before you run, make sure you have an .env file. Which you can make by copying and pasting .env.example file, where you need to add your API Key for it to work. 
Before you run, you also need to make sure you have redis installed and need to run the redis server by running the command "redis-server".
You go to the server directory in the terminal by writing: "cd server" and then "npm install" to install the dependencies. After which you run "npm run dev" to run the API in development mode. 

Now you can test if the server is working by going to http://localhost:8000/test. If you have started everything correctly, you should get "Server is Working".

If you want to convert a currency you go to the following URL: "http://localhost:8000/convert" and then add your query at the end of it. For example: http://localhost:8000/convert?from=PKR&to=GBP&amount=100. There are 3 values you need to give for it to work properly. From, to, amount. From is the currency you want to convert, you can also call it your base currency. To is the currency you want results in. And amount is the amount you wanted to be converted. 

You cannot leave any of these 3 values empty. And you need to make sure you write the correct ISO 4217 Code of the currencies. For example: USD, EUR, GBP, TRY, PKR and so on. 


DOCKER: 

If you want to run the project using docker, just need to make sure you have docker installed and also have docker-compose installed. You just go into the server folder and write "docker-compose up --build". 
Please note, there's an issue with the docker connectity between API and redis. Needs to be fixed before we use that. 

InfluxDB & Grafana part is still not complete.

FRONTEND:
under construction. 

 And the tests have not been pushed onto the repo yet. 

Working on these 3 things and they will be pushed onto the repo soon enough.
