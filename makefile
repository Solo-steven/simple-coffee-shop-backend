.PHONY: clean reset

DB_NAME := coffee-shop-db
DB_PORT := 3400
DB_SCHEMA := coffee-shop

start:
	docker run --rm  -d\
		-v "${shell pwd}/.volume:/data/db" \
	    -v "$(shell pwd)/.data:/test" \
		-p ${DB_PORT}:27017 \
		--name ${DB_NAME} \
		mongo

reset-products:
	docker exec  -it ${DB_NAME} mongoimport \
		--db=$(DB_SCHEMA) \
		--collection=products \
		--drop \
		--jsonArray /test/products.json
reset-orders:
	docker exec  -it ${DB_NAME} mongoimport \
		--db=$(DB_SCHEMA) \
		--collection=orders \
		--drop \
		--jsonArray /test/orders.json
reset:  reset-products

entry:
	docker exec -it ${DB_NAME} /bin/bash

clean: 
	docker stop ${DB_NAME}