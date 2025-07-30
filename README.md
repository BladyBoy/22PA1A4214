# 22PA1A4214# URL Shortener Microservice

## Overview

This is a lightweight URL Shortener microservice built with Node.js and Express. It offers RESTful API endpoints to shorten long URLs, redirect shortened URLs, and provide usage statistics. The service features a custom logging middleware that records all requests for auditing and debugging.

## Features

- Create short URLs with optional custom shortcodes and configurable expiry times.
- Redirect short URLs to their original URLs with proper HTTP status.
- Track click metadata including timestamp, referrer, and mocked geo-location.
- Retrieve detailed usage statistics for each shortcode.
- Custom logging middleware logging every incoming request to a file.
- In-memory storage optimized for rapid prototyping and testing.
- Robust input validation and comprehensive error handling.

## Technology Stack

- **Node.js** – JavaScript runtime environment for building server-side applications.
- **Express.js** – Fast, minimal web framework for Node.js to build APIs.
- **In-memory Storage** – Using JavaScript Map object to store URL data during runtime.
- **Node.js `fs` Module** – For asynchronous logging of HTTP requests to filesystem.
- **Jest & Supertest** – For automated testing of API endpoints (if tests included).

## Postman Collection

You can test all API endpoints easily by importing the following Postman collection:

**Postman Collection Link:**  
[https://www.postman.com/winter-meteor-543402/workspace/public-workspace/collection/44123317-61d14958-7ce1-4791-995d-2817dcc855e0](https://www.postman.com/winter-meteor-543402/workspace/public-workspace/collection/44123317-61d14958-7ce1-4791-995d-2817dcc855e0?action=share&creator=44123317)


## API Endpoints

### POST `/shorturls`

Create a new shortened URL.

- **Request Body Parameters (JSON):**

  - `url` (string, required): The original long URL to shorten.
  - `shortcode` (string, optional): Custom shortcode with 4-10 alphanumeric characters.
  - `validity` (integer, optional): Expiry time in minutes for the shortened URL (default is 30).

- **Response Example:**
```
{
"shortLink": "http://localhost:3000/custom1",
"expiry": "2025-07-30T06:45:46.966Z"
}
```


- **Possible Errors:**
  - 400 Bad Request (invalid URL or shortcode format)
  - 409 Conflict (shortcode already in use)

---

### GET `/:shortcode`

Redirect to the original URL corresponding to the shortcode.

- **Behavior:**
  - Returns HTTP 302 redirect to the original URL if valid.
  - Returns 404 if shortcode does not exist.
  - Returns 410 if shortcode has expired.

---

### GET `/shorturls/:shortcode`

Retrieve statistics about a specific shortcode.

- **Response Example:**

```
{
"originalUrl": "https://example.com/page",
"createdAt": "2025-07-30T05:00:00.000Z",
"expiresAt": "2025-07-30T05:30:00.000Z",
"totalClicks": 3,
"clicks": [
{
"timestamp": "2025-07-30T05:10:00.000Z",
"referrer": "direct",
"geo": "unknown"
}
]
}
```


- **Possible Errors:**
  - 404 Not Found (shortcode not found)
  - 410 Gone (shortcode expired)

## Architecture and Design

- **Modular Express Routing:** Clear separation of routes and controllers.
- **In-Memory Data Storage:** JavaScript Map used for fast lookup and prototype simplicity.
- **Unique Shortcode Generation:** Random six-character alphanumeric code with collision checks and optional user-defined shortcodes.
- **Custom Middleware:** Logging middleware asynchronously appends details of every request to a dedicated log file.
- **Error Handling:** Consistent error responses with meaningful HTTP status codes and messages.
- **Assumptions:**  
  - Data is not persisted beyond server runtime.  
  - Geo-location in click tracking is mocked as `"unknown"`.  
  - Service currently supports single instance deployment without clustering.

## Getting Started

1. **Clone the repository:**

```
git clone https://github.com/BladyBoy/22PA1A4214.git
```


2. **Install dependencies:**

```
npm install 
```


3. **Start the server:**

```
npm start
```


4. **Test API endpoints** using an API client such as Postman, curl, or Insomnia.

## Postman Collection

To facilitate testing, import the provided Postman collection into your API client. This collection contains pre-configured requests with example payloads and expected responses.

**Postman Collection Link:**  
[Insert your Postman collection shareable link here]

This collection covers all API endpoints including URL creation, redirection, and statistics retrieval.

## Notes

- The custom logging middleware is mandatory per project requirements.
- All API endpoints respond with JSON and appropriate HTTP status codes.
- This microservice is designed primarily for demonstration and assessment, not production use.
- Future improvements could include persistent storage, real geo-location services, authentication, and scalability enhancements.

## License

This project is developed for educational and assessment purposes only.

---

*Prepared July 2025*
