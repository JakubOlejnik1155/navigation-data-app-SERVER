# navigation-data-app-SERVER
[NodeJS](https://nodejs.org/en/) server API for navigation data Progressive web app called: [NavData](https://github.com/JakubOlejnik1155/navigation-data-app). <br></brDatabase>Database based on [MonogoDB](https://www.mongodb.com/)

**Used in development:** <br>
* [nodemon](https://www.npmjs.com/package/nodemon)
* [express](https://expressjs.com/)
* [mongoose](https://mongoosejs.com/docs/)
* [bcryptjs](https://www.npmjs.com/package/bcrypt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [dotenv](https://www.npmjs.com/package/dotenv)

# breakpoints:
* **POST `/api/user/register`**
	- regiter user in database. 
Request body sample:
```javascript
	req.body = {
		email: "sample.email@domain.com",
		password: "samplePassword",
		password2: "samplePassword2"
	};
```
* **POST `/api/user/login`**
	- User login breakpont. User gets JWT after logging in.
Request body sample:
```javascript 
    req.body = {
        email: "sample.email@domain.com",
        password: "samplePassword"
    };
```
* **GET `/api/user`**
	- Get user Information. priavte breakpoint. <br>User needs to pass JWT (Json Web Token) to use this path
```javascript 
	 fetchOptions = {
        method: 'GET',
        headers: {
            'auth-token': userJWT
        }
    };
```
* **PATCH `/api/user`**
	- Breakpoint to synchronize offline data and online data connected to logged in user. priavte breakpoint. User needs to pass JWT (Json Web Token) to use this path
```javascript 
//fetch options
	 fetchOptions = {
        method: 'PATCH',
        headers: {
            'auth-token': userJWT,
            'Content-Type: "application/json"
        },
        body: JSON.stringify(data)
    };
//body sample
    body: {
        "log":31073257,
        "harborsArray": userHarborsArray,
        "tripsArray": userTripsArray
    }
```
* **DELETE `/api/harbor/:name`**
	- Breakpoint to delete harbor from DB. Priavte route.
	User needs to pass JWT (Json Web Token) to use this path
* **DELETE `/api/trip/:startTime`**
	- Breakpoint to delete trip object from DB. Priavte route.
	User needs to pass JWT (Json Web Token) to use this path
	
**<i>Copyright ©:** Jakub Olejnik, 2020, v1.0</i>

