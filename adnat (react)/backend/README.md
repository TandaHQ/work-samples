# Adnat React Backend Endpoints

This is the documentation for the JSON API to support your React frontend for Adnat. The API is JSON REST, broken down into a few main sections:

- [`Authentication`]()
- [`Organisations`]()
- [`Shifts`]()
- [`Me`]()

All requests (except for signup and login) will need an `Authorization` header with the user's session ID.

You receive this in the response to the [`signup`]() and [`login`]() requests under the `sessionId` key.

Additionally, as this is a JSON API, you should be attaching a JSON content type header as well.

```javascript
{
  "Authorization": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "Content-Type": "application/json"
}
```

---

## Authentication

### Signup

**`POST`**`/auth/signup`

```javascript
// body
{
  "email": "barney@gmail.com",
  "password": "mypassword",
  "passwordConfirmation": "mypassword"
}
```

### Login

**`POST`**`/auth/login`

```javascript
// body
{
  "email": "barney@gmail.com",
  "password": "mypassword"
}
```

### Logout (delete session)

**`DELETE`**`/auth/logout`

---

## Organisations

### List Organisations

**`GET`**`/organisations`

### Create and Join Organisation

**`POST`**`/organisations/create_join`

```javascript
// body
{
	"name": "My Organisation",
	"hourlyRate": 100.12 // optional
}
```

### Join Organisation

**`POST`**`/organisations/join`

```javascript
// body
{
	"organisationId": 1
}
```

### Update Organisation

**`PUT`**`/organisations/:id`

```javascript
// body
{
  "name": "New Organisation",
  "hourlyRate": 34.5 // optional
}
```

### Leave Organisation

**`POST`**`/organisations/leave`

---

## Shifts

### Get Shifts

**`GET`**`/shifts`

### Create Shift

**`POST`**`/shifts`

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

**`PUT`**`/shifts/:id`

```javascript
// body
{
  "start": "2018-01-01 11:15", // optional
  "finish": "2018-01-01 11:20", // optional
  "breakLength": 10 // optional
}
```

### Delete Shift

**`DELETE`**`/shifts/:id`

---

## Me

### Get User Information

**`GET`**`/me`

### Update User Details

**`PUT`**`/me/update`

```javascript
// body
{
  "name": "Not Barney", // optional
  "email": "notbarney@gmail.com" //optional
}
```

### Change Password

**`PUT`**`/me/change_password`

```javascript
// body
{
	"oldPassword": "opensesame",
	"newPassword": "gfdkljdfgdfgjkldfgkljfgljk",
	"newPasswordConfirmation": "gfdkljdfgdfgjkldfgkljfgljk"
}
```
