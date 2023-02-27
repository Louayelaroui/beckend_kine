# API Documentation

## Introduction

This API provides endpoints for managing players, quizzes, injuries and authentication for a football management application.

## Base URL

The base URL for all endpoints is `http://localhost:$PORT`.

## Authentication

Authentication is required to access protected endpoints. The API uses JSON Web Tokens (JWT) to authenticate requests. To authenticate, send a POST request to the `/api/auth/signin` endpoint with a JSON payload containing a valid email and password. The API will respond with a JWT token that must be included in the headers of subsequent requests using the `Authorization` header with the value `Bearer <token>`.

## Endpoints :

## AuthRoutes

Base URL: `/api/auth`

#### `POST /signin`

Sign in a user with their email and password.

- Request Body:

  - email (required) - The email address of the user.
  - password (required) - The password of the user.

- Response:

  - 200 OK on success, returns a JSON object containing a JWT token in the `token` field.
  - 400 Bad Request if the email or password is missing.
  - 401 Unauthorized if the email or password is incorrect.

#### `POST /logout`

Sign out a user by invalidating their JWT token.

- Request Body: None
- Response:

  - 204 No Content on success.
  - 401 Unauthorized if the user is not authenticated.

## PlayerRoutes

#### GET `/api/player`

Retrieve a list of all players in the database.

- Query Parameters:
  - `name`: Filter players by name.
  - `position`: Filter players by position.
- Response:
  - `200 OK`: Returns a JSON array of all players that match the query parameters.
  - `400 Bad Request`: If any of the query parameters are invalid.
  - `401 Unauthorized`: If the request is not authenticated.

#### GET `/api/player/:playerId`

Retrieve details for a specific player by ID.

- Response:
  - `200 OK`: Returns a JSON object with details for the requested player.
  - `401 Unauthorized`: If the request is not authenticated.
  - `404 Not Found`: If no player is found with the specified ID.

#### POST `/api/player`

Create a new player in the database.

- Request Body:
  - `name`: The name of the player.
  - `position`: The position of the player.
  - `age`: The age of the player.
- Response:
  - `201 Created`: Returns a JSON object with the details of the newly created player.
  - `400 Bad Request`: If any of the required request parameters are missing or invalid.
  - `401 Unauthorized`: If the request is not authenticated.
  - `403 Forbidden`: If the authenticated user is not authorized to create players.

#### PUT `/api/player/:playerId`

Update the details for a specific player by ID.

- Request Body:
  - `name`: The new name of the player.
  - `position`: The new position of the player.
  - `age`: The new age of the player.
- Response:
  - `200 OK`: Returns a JSON object with the updated details for the player.
  - `400 Bad Request`: If any of the required request parameters are missing or invalid.
  - `401 Unauthorized`: If the request is not authenticated.
  - `403 Forbidden`: If the authenticated user is not authorized to update the player.
  - `404 Not Found`: If no player is found with the specified ID.

#### DELETE `/api/player/:playerId`

Delete a specific player by ID.

- Response:
  - `204 No Content`: If the player is successfully deleted.
  - `401 Unauthorized`: If the request is not authenticated.
  - `403 Forbidden`: If the authenticated user is not authorized to delete the player.
  - `404 Not Found`: If no player is found with the specified ID.

## InjuryRoutes

### GET `/api/injury`

Get a list of all injuries.

**Request Parameters:**

None

**Response:**

- `200 OK` on success, returns an array of injuries.
- `401 Unauthorized` if the user is not authenticated.
- `500 Internal Server Error` if there is an unexpected error while retrieving the injuries.

### GET `/api/injury/:injuryId`

Get a specific injury by ID.

**Request Parameters:**

- `injuryId` (required) - The ID of the injury to retrieve.

**Response:**

- `200 OK` on success, returns the requested injury.
- `401 Unauthorized` if the user is not authenticated.
- `404 Not Found` if the injury with the specified ID does not exist.
- `500 Internal Server Error` if there is an unexpected error while retrieving the injury.

### POST `/api/injury`

Create a new injury.

**Request Body:**

- `playerId` (required) - The ID of the player who sustained the injury.
- `date` (required) - The date when the injury occurred.
- `type` (required) - The type of injury sustained.
- `description` (optional) - A description of the injury.
- `status` (optional) - The status of the injury (Active or Inactive).

**Response:**

- `201 Created` on success, returns the newly created injury.
- `400 Bad Request`: If any of the required request parameters are missing or invalid.
- `500 Internal Server Error` if there is an unexpected error while retrieving the injury.

#### DELETE `/api/injury/:injuryId`

**Description:** Deletes an existing injury record.

**Parameters:**

- `injuryId`: the ID of the injury record to be deleted.

**Headers:**

- `Authorization`: a bearer token obtained by logging in with valid user credentials.

**Response:**

- Status Code 200: Success. The injury record was deleted successfully.
- Status Code 401: Unauthorized. The user does not have the required authorization to perform this action.
- Status Code 404: Not Found. The requested injury record could not be found.

#### PUT `/api/injury/:injuryId`

**Description:** Updates an existing injury record.

**Parameters:**

- `injuryId`: the ID of the injury record to be updated.

**Headers:**

- `Authorization`: a bearer token obtained by logging in with valid user credentials.

**Body:**

- `player`: the ID of the player who suffered the injury.
- `description`: a brief description of the injury.
- `date`: the date when the injury occurred.
- `type`: the type of injury (e.g. sprain, strain, fracture).
- `status`: the current status of the injury (e.g. active, healing, healed).

**Response:**

- Status Code 200: Success. The injury record was updated successfully.
- Status Code 400: Bad Request. The request body was invalid or missing required fields.
- Status Code 401: Unauthorized. The user does not have the required authorization to perform this action.
- Status Code 404: Not Found. The requested injury record could not be found.

#### GET `/api/injury/:injuryId`

**Description:** Retrieves information about a specific injury record.

**Parameters:**

- `injuryId`: the ID of the injury record to retrieve.

**Headers:**

- `Authorization`: a bearer token obtained by logging in with valid user credentials.

**Response:**

- Status Code 200: Success. The requested injury record was retrieved successfully.
- Status Code 401: Unauthorized. The user does not have the required authorization to perform this action.
- Status Code 404: Not Found. The requested injury record could not be found.

#### GET `/api/injury/player/:playerId`

**Description:** Retrieves information about all injuries suffered by a specific player.

**Parameters:**

- `playerId`: the ID of the player to retrieve injury records for.

**Headers:**

- `Authorization`: a bearer token obtained by logging in with valid user credentials.

**Response:**

- Status Code 200: Success. The requested injury records were retrieved successfully.
- Status Code 401: Unauthorized. The user does not have the required authorization to perform this action.
- Status Code 404: Not Found. The requested player could not be found.
