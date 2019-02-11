# Adnat React Challenge
## Endpoints
All requests will need an authorization header with the users session ID
```javascript
{
  "Authorization": "52d8e07a-2680-4bc7-b9ed-d5aa8bf69c3b",
  "Content-Type": "application/json"
}
```

### Signup
POST /auth/signup
```javascript
// body
{
  "email": "barney@gmail.com",
  "password": "mypassword",
  "passwordConfirmation": "mypassword"
}
```

### Login
POST /auth/login
```javascript
// body
{
  "email": "barney@gmail.com",
  "password": "mypassword"
}
```

### Create and Join Organisation
POST /organisations/create_join
```javascript
// body
{
	"name": "My Organisation",
	"hourlyRate": 100.12 // optional
}
```

### Join Organisation
POST /organisations/join
```javascript
// body
{
	"organisationId": 1
}
```

### List Organisations
GET /organisations

### Update Organisation
PUT /organisations/:id
```javascript
// body
{
  "name": "New Organisation",
  "hourlyRate": 34.5 // optional
}
```

### Leave Organisation
PUT /organisations/leave
```javascript
// body
{
  "organisationId": 1
}
```

### Get Shifts
GET /shifts

### Create Shift
POST /shifts/
```javascript
// body
{
  "userId": 1,
  "start": "2018-01-01 10:15",
  "finish": "2018-01-01 10:20",
  "breakLength": 30 // optional
}
```

### Update Shift
PUT /shifts/:id
```javascript
// body
{
  "start": "2018-01-01 11:15", // optional
  "finish": "2018-01-01 11:20", // optional
  "breakLength": 10 // optional
}
```

### Delete Shift
DELETE /shifts/:id

### Get User Information
GET /me

### Update User Details
PUT /me/update
```javascript
// body
{
  "name": "Not Barney", // optional
  "email": "notbarney@gmail.com" //optional
}
```

### Change Password
PUT /me/change_password
```javascript
// body
{
	"oldPassword": "opensesame",
	"newPassword": "gfdkljdfgdfgjkldfgkljfgljk",
	"newPasswordConfirmation": "gfdkljdfgdfgjkldfgkljfgljk"
}
```

### Logout (delete session)
DELETE /me/logout
