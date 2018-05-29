# Rest API Example

# Technologies
1. Node JS 10.x
2. PostgreSQL 9.6.x
2. Express JS 4.x
3. TypeORM 0.2.x
4. TypeScript 2.x
5. Docker (Optional)
6. Swagger

## Steps to run locally on your terminal
    1. Create a user table  by executing the schema from  /schema/user.sql.
    2. Modify the /src/config.ts. (Replace it with the a database connection details)
    3. Installing all the dependenies - npm i
    4. Starting the server - npm run dev

## Steps to run locally as a docker container
    1. Install docker on your machine
    2. Create a user table  by executing the schema from  /schema/user.sql.
    3. Modify the /src/config.ts. (Replace it with the a database connection details)
    4. Installing all the dependenies  - npm i
    5. Run - sh build.sh tesing or prod
    6. Open http://localhost:8500 on your browser or postman to check the service

## Postman Document for API reference
https://documenter.getpostman.com/view/1418101/RW8CJTaR