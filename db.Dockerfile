FROM mysql:5.7 

COPY ./docker-compose/mysql/ /docker-entrypoint-initdb.d/

