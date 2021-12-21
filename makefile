.PHONY: clean reset

DB_NAME := test-mongodb
DB_PORT := 3400

start:
	docker run --rm  -d\
		-v "${shell pwd}/.database:/data/db" \
	    -v "$(shell pwd)/.test:/test" \
		-p ${DB_PORT}:27017 \
		--name ${DB_NAME} \
		mongo

reset: 
	docker exec  -it ${DB_NAME}   mongoimport \
		--db=$(DB_NAME) \
		--collection=products \
		--drop \
		--jsonArray /test/products.json


clean: 
	docker stop ${DB_NAME}