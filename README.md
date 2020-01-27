# APPSTREET BACKEND TASK

# how to setup?
  - go to env folder 
  - create four file 
  - 1) development.env
  - 2) production.env
  - 3) testing.env
  - 4) node_env.env
    then edit the node_env.env file and put 
    NODE_ENV=development for development environment
    NODE_ENV=production for production environment 
    NODE_ENV=testing  for testing environment 

### working in development environment  in local pc
    NODE_ENV=development in env/node_env.env file 
 - put the following environment variable 
 - POSTGRES_DATABASE=<database name>
 - POSTGRES_USER=<database user>
 - POSTGRES_PASSWORD=<database password>
 - POSTGRES_HOST=<database host>
 - POSTGRES_PORT=<database port default 5432> 
 - APP_PORT=<application running port, default 3000>
 - now you are almost ready for development environment 
 - run "npm i" 
 - run "npm run migration"
 - run "npm run seed"
 - run "npm run dev"

### working in development environment with docker 
- environment variable could be passed by ***dev.Dockerfile*** or set in ***env/development.env***  
- currently in development docker container we have to use  ***env/development.env***
- run ***npm run build:dev***
- run ***npm run build:dev:run***

 
### working in production environment for local pc  
    NODE_ENV=production in env/node_env.env file
 - put the following environment variable 
 - POSTGRES_DATABASE=<database name>
 - POSTGRES_USER=<database user>
 - POSTGRES_PASSWORD=<database password>
 - POSTGRES_HOST=<database host>
 - POSTGRES_PORT=<database port default 5432> 
 - APP_PORT=<application running port, default 3000>
 - now you are almost ready for development environment 
 - run **npm i** 
 - run ***npm run migration***
 - run ***npm run seed***
 - run ***npm run dev***
 
### working in production environment with docker
 - for production docker container we have to set environment variable in **Dockerfile** 
 - just set enviroment variable  in **Dockerfile** 
 - run **npm run build:prod** for building production docker container   
 - run **npm run build:prod:run** for building and running in production docker container  
 - default port maping is ***3000 to 3000*** application port and server port 


### /list 
    This endpoint will give all the products and there varients
    We can filter products by search query params    
    - ?search=iPhone  
    - ?search=cpu
    - ?search=amd
    - ?search=laptop  
    Query params filter will filter specific product
    For example 
    - ?filter=red&filter=1Tb 
    Will give product with red attribute  or 1Tb attribute   
    Default filter mechanism is union

 example of /list
 ---
 [{
        "product_id": 2,
        "variant_name": "red 128Gb 1.02Kg laptop asus",
        "variant_description": "red 128Gb 1.02Kg",
        "price": 73326,
        "variant_id": 13,
        "product_name": "laptop",
        "description_product": "Cheap laptop",
        "company_name": "asus",
        "color": "red",
        "storage": "128Gb",
        "ram": "32Gb",
        "weight": "1.02Kg"
    },
    {
        "product_id": 2,
        "variant_name": "red 128Gb 1.5kg laptop asus",
        "variant_description": "red 128Gb 1.5kg",
        "price": 71078,
        "variant_id": 14,
        "product_name": "laptop",
        "description_product": "Cheap laptop",
        "company_name": "asus",
        "color": "red",
        "storage": "128Gb",
        "weight": "1.5kg",
        "ram": "16gb"
    }]
    ---
### /details/:id
Where id is varient_id when you fetch list you will get **variant_id** with that varient and all the sibling products.

### Example of details api
#### /details/6 
    
    {
    "siblingPurchasable": [
        {
            "product_id": 2,
            "variant_name": "red 128Gb 1Kg laptop asus",
            "variant_description": "red 128Gb 1Kg",
            "price": 17538,
            "variant_id": 6,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "color": "red",
            "storage": "128Gb",
            "weight": "1Kg",
            "ram": "16gb"
        },
        {
            "product_id": 2,
            "variant_name": "red 128Gb 1Kg laptop asus",
            "variant_description": "red 128Gb 1Kg",
            "price": 48070,
            "variant_id": 8,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "color": "red",
            "weight": "1Kg",
            "storage": "128Gb",
            "ram": "32Gb"
        },
        {
            "product_id": 2,
            "variant_name": "red 128Gb 1Kg laptop asus",
            "variant_description": "red 128Gb 1Kg",
            "price": 17021,
            "variant_id": 9,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "weight": "1Kg",
            "storage": "128Gb",
            "color": "red",
            "ram": "8gb"
        },{
            "product_id": 2,
            "variant_name": "yellow 2Tb 1Kg laptop asus",
            "variant_description": "yellow 2Tb 1Kg",
            "price": 83385,
            "variant_id": 142,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "storage": "2Tb",
            "weight": "1Kg",
            "ram": "8gb",
            "color": "yellow"
        },
        {
            "product_id": 2,
            "variant_name": "yellow 2Tb 1.02Kg laptop asus",
            "variant_description": "yellow 2Tb 1.02Kg",
            "price": 388,
            "variant_id": 146,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "ram": "32Gb",
            "color": "yellow",
            "weight": "1.02Kg",
            "storage": "2Tb"
        }
    ],
    "askedPurchasable": [
        {
            "product_id": 2,
            "variant_name": "red 128Gb 1.5kg laptop asus",
            "variant_description": "red 128Gb 1.5kg",
            "price": 37300,
            "variant_id": 12,
            "product_name": "laptop",
            "description_product": "Cheap laptop",
            "company_name": "asus",
            "color": "red",
            "storage": "128Gb",
            "weight": "1.5kg",
            "ram": "8gb"
        }
    ]}
  