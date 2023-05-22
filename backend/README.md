<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


# Repository Pattern? 

The Repository Pattern is a software design pattern commonly used in object-oriented programming to separate the logic that retrieves and stores data from the rest of the application. It provides a way to abstract and encapsulate data access operations, making the code more modular, maintainable, and testable.

In the Repository Pattern, a repository acts as an intermediary between the data source (such as a database or web service) and the application. It provides a consistent interface for performing CRUD (Create, Read, Update, Delete) operations on data objects without exposing the underlying data access details.

By using the Repository Pattern, developers can isolate the data access code from the business logic, promoting separation of concerns and making it easier to swap out data sources or change the underlying data access technology. It also allows for better testability by providing a way to mock or substitute repositories during unit testing.

Overall, the Repository Pattern improves code organization, flexibility, and maintainability by abstracting data access operations and promoting modular design in software applications.

# Repository Pattern in Laravel

A simple Laravel application based on **REPOSITORY PATTERN**,  starter kit to kick start development using Laravel. 

Application Name ................................................................... Repository Pattern in Laravel

Laravel Version ...................................................................... 10.4.1

PHP Version ........................................................................... 8.1.10

Database ................................................................................ MYSQL 

## FEATURES:
**Customers**  	(Create | Read | Update (PUT, PATCH) | Delete).

**Orders**  		(Create | Read | Update (PUT, PATCH) | Delete) 

## Installation
Go to CLI and run below commands:  
```bash
https://github.com/imgrasooldev/repository-pattern-in-laravel.git
cd repository-rattern-in-laravel
```
open .env file (available) at root directory and check (or update) database details.

using CLI run below commands also:  
```bash
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

## Endpoints: 

#### Register User: 
```
POST /api/v1/register
Body => {
    "name": "",
    "email": "",
    "password": "",
    "confirmPassword": ""
}
```

#### Login User: 
```
POST	/api/v1/login
Body => {
    "email": "",
    "password": ""
}
```

**(Pass token from login/register response as bearer-token to all below apis as all are restricted with sanctum middleware)**

#### Get Customers: 
```
GET	/api/v1/customers
```
#### Get Single Customer: 
```
GET	/api/v1/customers/{id}
```
#### Get Filtered Customers: 
```
GET 	/api/v1/customers?includeOrders=true&name[eq]=Rubye Lemke
```
"**IncludeOrders** query parameter is to include individual customer orders inside response."

#### Create Customer:
```
POST	/api/v1/customers
        Body => {
                    "name": "",
                    "email": "",
                    "address": "",
                    "city": "",
                    "state": "",
                    "postalCode": ""
                }
```

#### Edit Customer:
```
PUT 	/api/v1/customers/{id}
		Body => {
                    "name": "",
                    "email": "",
                    "address": "",
                    "city": "",
                    "state": "",
                    "postalCode": ""
                }


PATCH 	/api/v1/customers/{id}
		Body => {
                    "name": "",
                }
```

#### Delete Customer:
```
	DELETE 	/api/v1/customers/{id}
```
#### Get Orders:
```
GET 	/api/v1/orders
```
#### Get Single Order:
```
	GET 	/api/v1/orders/{id}
```
#### Get Filtered Orders:
```
	GET	    /api/v1/orders?includeCustomer=true&isFulFilled[eq]=1
```
"**IncludeCustomer** query parameter is to include customer against order in response."
#### Create Order:
```
POST	/api/v1/orders
        Body => {
                    "customerId": "131",
                    "details": "Lorem is simply a dummy text",
                    "isFulFilled": 0
                }
```

#### Edit Order:
```
PUT 	/api/v1/orders/{id}
        Body => {
                    "customerId" : 132,
                    "details" : "adafABCDEFghijkls222",
					"isFulFilled" : 1
                }

PATCH 	/api/v1/orders/{id}
        Body => {
                    "customerId" : 132,
                    "details": "Lorem ipsum ABCDEFghijkl"
                }
```

#### Delete Order:
```
	DELETE 	/api/v1/orders/{id}
```





Best of Luck :+1:

Rate my work please :star:
