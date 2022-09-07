# Jopa-Savvy-Backend

Jopa-Savvy REST API  

## API Endpoint Specification

### Products category

POST base_url/api/categories add a product category

Request body:

{
    "name": "electronics" //required
}

Response spec:

{

    "status": "success",

    "data": {

        "name": "String",

        "categoryId": String,  // id of the newly created category

    }

}

GET base_url/api/categories Get all product categories

Request body:


Response Spec:

{

    "status": "success",

    "data": [

        {

        "id": String,

        "name": String,

        "categoryId": String,

        "cratedAt": DateTime,

        "updatedAt": DateTime

    }, {

        "id": String,

        "name": String,

        "categoryId": String,

        "cratedAt": DateTime,

        "updatedAt": DateTime

    }
        ...

    ]

}
GET base_url/v1/categories/:_id:      // Get one category

Response spec:

{

    "status": "success",

    "data": {

        "id": String,

        "name": String,

        "categoryId": String,

        "cratedAt": DateTime,

        "updatedAt": DateTime

    }

}

PATCH /v1/categories/:_id updates a categories name  

Request body: 
{
    "name": String // requiered
}

Response spec:

{

    "status": "success",

    "data": {

       "id": String,

        "name": String,

        "categoryId": String,

        "cratedAt": DateTime,

        "updatedAt": DateTime

    }

}


### Products

POST /v1/properties Adds a new property  

Request body:

{

        "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images": Images

}

Response spec:

{

    "status": "success",

    "data": {

       "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime

    }

}

#### Note: Only include fields you will like to update in your request object 

PATCH /v1/properties/:propertyId updates some details of a product

Request body:

{

        "name": String,

        "description": String,

        "category": String,

        "price": Float,
        
        "quantity": Integer,

}


Response spec:

{

    "status": "success",

    "data": {
        
        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime

    }

}}

DELETE /v1/properties/:_id Delete a property

Response spec

{

    "status": "success",

    "message": "Property was deleted successfully"

}

GET /v1/property/:_id: Get a specific property by ID

{

    "status": "success",

    "data": {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime

    }

}


GET /v1/properties: Get all properties

Response spec

{

    "status": "success",

    "data": [

        {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime
    }, {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime
    }
        ...

    ]

}

GET /property??stockStatus=in_stock&category=electronics: Get all properties with stockStatus and/or a particular category

Response spec

Response spec:

{

    "status": "success",

    "data": [

        {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime
    }, {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,  // either "in_stock" or "out_of_Stock"
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime
    }
        ...

    ]

}

POST /v1/properties/images/:_id Addes images to a property

Request body:  

{

    "images": images

}

Response body:

{

    "status": "success",

    "data": {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime

    }

}


DELETE /v1/properties/images/:_id Deletes image(s) to a property

Request body:  

{

    "url1: String,

    "url2": String

}

Response body:

{

    "status": "success",

    "data": {

        "id": String,

       "name": String,

        "description": String,

        "category": String,

        "price": Float,

        "stockStatus": String,
        
        "quantity": Integer,

        "images_url": Array,

        "createdAt": DateTime,

        "updatedA": DateTime

    }

}