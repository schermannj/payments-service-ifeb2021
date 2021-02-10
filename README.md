# Payment Service

##Description
A payment micro-service example, exposes CRUD API to manage payments.


##Installation

```
yarn
```

##Run

```
yarn start
```

If you want to start on a different port, please use next command

```
cross-env PORT=3030 yarn start
```

## API Description

### Get a payment

```
GET: /api/payments/:id

Example: /api/payments/1
```


### List payments 

```
GET: /api/payments?contractId=:contractId&startDate=:startDate&endDate=:endDate

Example: /api/payments?contractId=17689&endDate=2016-12-09T01:50:59
```

Note, only contractId is required, everything else is optional.


### Create a payment

```
POST: /api/payments

{
	"contractId": 17689,
	"description": "test payment",
	"value": 123.3,
	"time": "2021-02-10 23:10:01"
}
```

### Update a payment
```
PATCH: /api/payments/:id

{
	"description": "test payment update",
	"value": 123.3,
	"time": "2021-02-10 23:10:01"
}
```

Note, you can include only those parameters that you want to update.


### Delete a payment

```
DELETE: /api/payments/:id
```
