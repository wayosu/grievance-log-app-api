# User API Spec

## Register User

Endpoint: `POST /api/users`

Request Body:
```json
{
    "username": "wayosu",
    "password": "secret",
    "name": "Wahyu Setiawan Usman"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "wayosu",
        "name": "Wahyu Setiawan Usman"
    }
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Validation error",
        "details": {
            "username": ["Username must not be blank"],
            "password": ["Password must be at least 8 characters"]
        }
    }
}
```

## Login User

Endpoint: `POST /api/users/login`

Request Body:
```json
{
    "username": "wayosu",
    "password": "secret"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "wayosu",
        "name": "Wahyu Setiawan Usman",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Invalid credentials"
    }
}
```

## Get User

Endpoint: `GET /api/users/current`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "username": "wayosu",
        "name": "Wahyu Setiawan Usman",
    }
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Unauthorized"
    }
}
```

## Update User

Endpoint: `PATCH /api/users/current`

Request Header:
- Authorization: token

Request Body:
```json
{
    "name": "kalau mau update nama",
    "password": "kalo mau update password"
}
```

Response Body (Success):
```json
{
    "data": {
        "username": "wayosu",
        "name": "Wahyu Setiawan Usman",
    },
    "message": "Successfully updated your username or password."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Validation error",
        "details": {
            "password": ["Password must be at least 8 characters"]
        }
    }
}
```

## Logout User

Endpoint: `DELETE /api/users/current`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data" : true
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Unauthorized"
    }
}
```
