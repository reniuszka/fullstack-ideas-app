my-ideas-app notes:

1. npm init : entry point: (index.js) server.js -> our entry point

2. npm i express - https://expressjs.com/
3. package.json : "scripts": {
   "start": "node server.js"
   }, -> npm start
4. postman -> http://localhost:5000
5. nodemon -> npm i -D nodemon -> "dev": "nodemon server.js" --> npm run dev
6. routes with express-> https://expressjs.com/en/guide/routing.html

---

7. mongodb -> npm i mongoose --> organized collection of data. MERN - mongodb, express, react, node. it stores data in collection of documents. Collection is a group of documents. it is like a json object (document)
   MongodbAtlas - cloud implementation.(https://www.mongodb.com/atlas/database)
   Mongoose - node package for working with mongodb
   a) quotesandideas = database
   b) ideas - colllection
   c) # before changes to .env
   d) mongoose - helps to connect to mongo, object data mapper, we create a model fo our resources for each collection
8. dotenv => npm i dotenv -> helps to use .env file
9. config mongoose -> db -> config folder and db file
10. models folder - Idea schema for our idea structure
11. create public folder and connect it as static(needed for production)
12. create client folder - copy package.json and webpack and src folder -> cd client and npm i and then try npm run build to check in folder public behaves as needed - so all build and bundler files go there
13. npm i @fortawesome/fontawesome-free
14. backend: npm i cors
    renia@DESKTOP-HCFMJ9C MINGW64 ~/Desktop/traversy2023/my-ideas-app/client
    $ npm run dev
    renia@DESKTOP-HCFMJ9C MINGW64 ~/Desktop/traversy2023/my-ideas-app
    $ npm run dev or npm start

    15. upload: npm run build for client-> fo fullstack -> https://render.com/

# mongodb+srv://renia_dd:<password>@cluster0.rxgihvy.mongodb.net/?retryWrites=true&w=majority

What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

When talking about express.json() and express.urlencoded() think specifically about POST requests (i.e. the .post request object) and PUT Requests (i.e. the .put request object)

You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.

You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
