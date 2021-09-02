# UserMicroservicesAPI
![REST API for User Microservices](https://user-images.githubusercontent.com/33638670/131924564-52cabb9f-4598-47e2-aac7-08b81d555a84.jpg)

## Features

-   Register
-   Email verification
-   Login
-   Find All User Accounts
-   Find One User Account 
-   Update One User Account
-   Delete One User Account

## Set-Up

### Prerequisites

-   mongoDB account and database set-up
-   Email hosting [ Email service is provided through nodemailer module ]

### Steps to set up development environment

1. Clone and set up repository or directly use repository as template

2. Run `npm install` in `root` 

3. Create `.env` in `root` and add secrets and your mongoDB and email hosting data:

    ```
    PORT = "YOUR_PORT_NUMBER"
    DB_CHOICE = mongoose
    MONGODB_URL = "YOUR_MONGODB_URL"
    ACEESS_TOKEN_SECRET= "YOUR_JSONWEBTOKEN_SECRET"
    BASE_URL = http://localhost:"YOUR_PORT_NUMBER"
    EMAIL_HOST = "YOUR_EMAIL_HOST"
    EMAIL_USER_NAME = "YOUR_EMAIL_USER_NAME"
    EMAIL_PASSWORD = "YOUR_EMAIL_PASSWORD"
    ```
### REST API ENDPOINTS

User Registeration
```
curl --location --request POST '{base_url}/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName" : "john",
    "lastName" : "doe",
    "email" : "johndoe@test.com",
    "password" : "johndoe"
}'
```

Activation link (user do not need to manually run this endpoint)
```
curl --location --request GET '{base_url}/verifyAccount?id={id}' \
--header 'Content-Type: application/json' \
```

To resend activation email (when the first activation link is expired)
```
curl --location --request POST '{base_url}/resendActivationEmail' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "johndoe@test.com",
    "password" : "johndoe"
}'
```

User Login to obtain jwt token (after user clicks on the activation link to verify its account)
```
curl --location --request POST '{base_url}/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "johndoe@test.com",
    "password" : "johndoe"
}'
```

Retrieve all user records
```
curl --location --request GET '{base_url}/user' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {bearer token}' \
--data-raw ''
```

Retrieve a user by ID
```
curl --location --request GET '{base_url}/user/{id}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {bearer token}' \
--data-raw ''
```

Update a user by ID
```
curl --location --request PUT '{base_url}/user/{id}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {bearer token}' \
--data-raw ''
```

Delete a user by ID
```
curl --location --request DELETE '{base_url}/user/{id}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {bearer token}' \
--data-raw ''
```
