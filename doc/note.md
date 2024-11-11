# Note API Spec

## Create Note

Endpoint: `POST /api/notes`

Request Header:
- Authorization: token

Request Body: 
```json
{
    "title": "Judul Catatan",
    "description": "Deskripsi Catatan"
}
```
Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "title": "Judul Catatan",
        "slug": "judul-catatan",
        "description": "Deskripsi Catatan",
        "created_at": "2024-11-11T10:00:00Z",
        "updated_at": "2024-11-11T10:00:00Z"
    },
    "message": "Note created successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Validation error",
        "details": {
            "title": ["Title is required"],
            "description" : ["Description is required"]
        }
    }
}
```

## Get Note

Endpoint: `GET /api/notes/{idNote}`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "title": "Judul Catatan",
        "slug": "judul-catatan",
        "description": "Deskripsi Catatan",
        "created_at": "2024-11-11T10:00:00Z",
        "updated_at": "2024-11-11T10:00:00Z"
    }
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Note not found"
    }
}
```

## Update Note

Endpoint: `PUT /api/notes/{idNote}`

Request Header:
- Authorization: token

Request Body:
```json
{
    "title": "Judul Catatan",
    "description": "Deskripsi Catatan"
}
```

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "title": "Judul Catatan",
        "slug": "judul-catatan",
        "description": "Deskripsi Catatan",
        "updated_at": "2024-11-11T10:10:00Z"
    },
    "message": "Note updated successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Validation error",
        "details": {
            "title": ["Title must not be empty"]
        }
    }
}
```

## Search Note

Endpoint: `GET /api/notes`

Request Header:
- Authorization: token

Query Parameters:
- `title` (string): Search by title
- `page`(number): Default 1
- `size`(number): Default 10
- `is_favorite` (boolean): True or False
- `is_archived`(boolean): True or False

Response Body (Success):
```json
{
    "data": [
        {
            "id": 1,
            "title": "Judul Catatan",
            "slug": "judul-catatan",
            "description": "Deskripsi Catatan",
            "is_favorite": true,
            "is_archived": false,
            "created_at": "2024-11-11T10:00:00Z",
            "updated_at": "2024-11-11T10:00:00Z"
        },
        {
            "id": 2,
            "title": "Judul Catatan",
            "slug": "judul-catatan-2",
            "description": "Deskripsi Catatan 2",
            "is_favorite": true,
            "is_archived": false,
            "created_at": "2024-11-11T10:05:00Z",
            "updated_at": "2024-11-11T10:05:00Z"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 2,
        "size": 10
    }
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Invalid query parameter"
    }
}
```

## Remove Note

Endpoint: `DELETE /api/notes/{idNote}`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": true,
    "message": "Note deleted successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Note not found"
    }
}
```

## Mark as Favorite

Endpoint: `POST /api/notes/{idNote}/favorite`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "is_favorite": true
    },
    "message": "Note marked as favorite successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Note not found or unauthorized access."
    }
}
```

## Unmark as Favorite

Endpoint: `DELETE /api/notes/{idNote}/favorite`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "is_favorite": false
    },
    "message": "Note removed from favorites."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Note not found or unauthorized access."
    }
}
```

## Archive Note

Endpoint: `POST /api/notes/{idNote}/archive`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "is_archived": true
    },
    "message": "Note archived successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Note not found or unauthorized access."
    }
}
```

## Unmark as Favorite

Endpoint: `DELETE /api/notes/{idNote}/archive`

Request Header:
- Authorization: token

Response Body (Success):
```json
{
    "data": {
        "id": 1,
        "is_archived": false
    },
    "message": "Grievance unarchived successfully."
}
```

Response Body (Error):
```json
{
    "error": {
        "message": "Grievance not found or unauthorized access."
    }
}
```
