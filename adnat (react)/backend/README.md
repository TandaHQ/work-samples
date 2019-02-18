# Adnat React Backend Endpoints

This is the documentation for the JSON API to support your React frontend for Adnat. The API is JSON REST, broken down into a few main sections:

- [`Authentication`](#authentication)
- [`Organisations`](#organisations)
- [`Shifts`](#shifts)
- [`Users`](#users)

All requests (except for signup and login) will need an `Authorization` header with the user's session ID.

You receive this in the response to the [`signup`](#signup) and [`login`](#login) requests under the `sessionId` key.

Additionally, as this is a JSON API, you should be attaching a JSON content type header as well. This is an example of the two header you would be applying.

```javascript
{
  "Authorization": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "Content-Type": "application/json"
}
```

If you receive a non-200 response code. There should be a message in the `error` key of the JSON response body. If you find any problems with this API, please fork this repo and open a PR.

---

## Authentication

### Signup

**`POST`**`/auth/signup`

```javascript
// body
{
  "name": "Barney Rubble",
  "email": "barney@gmail.com",
  "password": "mypassword",
  "passwordConfirmation": "mypassword"
}

// response
{
  "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
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

// response
{
  "sessionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Logout (delete session)

**`DELETE`**`/auth/logout`

```javascript
// response
200
````

---

## Organisations

### List Organisations

**`GET`**`/organisations`

```javascript
// response
[
  {
    id: 1,
    name: "My Organisation",
    hourlyRate: 100.12
  }
];
```

### Create and Join Organisation

**`POST`**`/organisations/create_join`

```javascript
// body
{
  "name": "My Organisation",
  "hourlyRate": 100.12
}

// response
{
  "id": 1,
  "name": "My Organisation",
  "hourlyRate": 100.12
}
```

### Join Organisation

**`POST`**`/organisations/join`

```javascript
// body
{
  "organisationId": 1
}

// response
{
  "id": 1,
  "name": "My Organisation",
  "hourlyRate": 100.12
}
```

### Update Organisation

**`PUT`**`/organisations/:id`

- `:id` is the ID of the organisation to be updated.

```javascript
// body
{
  "name": "New Organisation", // optional
  "hourlyRate": 34.5 // optional
}

// response
200
```

### Leave Organisation

**`POST`**`/organisations/leave`

---

## Shifts

### List Shifts

**`GET`**`/shifts`

```javascript
// response
[
  {
    id: 1,
    userId: 1,
    start: "2018-01-01 10:15",
    finish: "2018-01-01 12:20",
    breakLength: 30
  },
  {
    id: 2,
    userId: 1,
    start: "2018-01-02 10:15",
    finish: "2018-01-02 18:20",
    breakLength: 45
  }
];
```

### Create Shift

**`POST`**`/shifts`

- You can only create shifts for users within your organisation.

```javascript
// body
{
  "userId": 1,
  "start": "2018-01-01 10:15",
  "finish": "2018-01-01 12:20",
  "breakLength": 30 // optional
}

// response
{
  "id": 3,
  "userId": 1,
  "start": "2018-01-01 10:15",
  "finish": "2018-01-01 12:20",
  "breakLength": 30
}
```

### Update Shift

**`PUT`**`/shifts/:id`

- `:id` is the ID of the shift to be updated

```javascript
// body
{
  "start": "2018-01-01 11:15", // optional
  "finish": "2018-01-01 13:20", // optional
  "breakLength": 10 // optional
}

// response
{
  "id": 3,
  "userId": 1,
  "start": "2018-01-01 11:15", // optional
  "finish": "2018-01-01 13:20", // optional
  "breakLength": 10 // optional
}
```

### Delete Shift

**`DELETE`**`/shifts/:id`

- `:id` is the ID of the shift to be deleted

```javascript
// response
200
```

---

## Users

### List Organisation Users

**`GET`**`/users`

```javascript
// response
[
  {
    "id": 1,
    "organisationId": 1,
    "name": "Dave Allie",
    "email": "dave@tanda.co"
  },
  {
    "id": 2,
    "organisationId": 1,
    "name": "Dan Gilchrist",
    "email": "dan@tanda.co"
  }
];
```

### Get User Information

**`GET`**`/users/me`

```javascript
// response
{
  "id": 1,
  "organisationId": 1,
  "name": "Dave Allie",
  "email": "dave@tanda.co"
}
```

### Update User Details

**`PUT`**`/users/me`

```javascript
// body
{
  "name": "Not Dave Allie", // optional
  "email": "notdave@tanda.co" // optional
}

// response
{
  "id": 1,
  "organisationId": 1,
  "name": "Not Dave Allie",
  "email": "notdave@tanda.co"
}
```

### Change Password

**`PUT`**`/users/me/change_password`

```javascript
// body
{
  "oldPassword": "opensesame",
  "newPassword": "opensesame123",
  "newPasswordConfirmation": "opensesame123"
}

// response
200
```
