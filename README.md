# APIRequestBuilder Documentation
The `APIRequestBuilder` provides a fluent interface for constructing and executing API requests **with axios**, making it easier to work with API endpoints.

## Installation
```shell
npm install <name-of-the-package>
```
## Usage
First, import the class:

```typescript

import { APIRequestBuilder } from '<name-of-the-package>';
```

## Features
- Fluent API for easy request configuration.
- Automatic Authorization Header based on provided token.
- Validation of critical request components before execution.
- Supports all main **HTTP methods** (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).


## Class Methods
- Constructor: `APIRequestBuilder(baseUrl: string, token?: string)`
- baseUrl: The base URL for the API endpoint.
- token: Optional authentication token. If provided, it automatically sets the Authorization header for requests.
```typescript
const api = new APIRequestBuilder('https://api.example.com', 'YOUR_TOKEN');
```

### Request Methods
- `.get()`: Sets the request method to GET.
- `.post(data: any)`: Sets the request method to POST and the request data.
- `.put(data: any)`: Sets the request method to PUT and the request data.
- `.delete()`: Sets the request method to DELETE.
- `.patch(data: any)`: Sets the request method to PATCH and the request data.

### Configuration Methods
- `.setBaseUrl(url: string)`: Updates the base URL for the request.
- `.setRelativePath(resourcePath: string)`: Sets the relative path for the resource being requested.
- `.setQueryParameters(params: Record<string, string | number>)`: Sets query parameters for the request.
- `.setToken(token: string)`: Updates the authorization token for the request headers.
- `.setResponseType(type: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream')`: Sets the expected response type for the request.

### Execution
- `.execute()`: Executes the API request with the previously defined configurations.
-
### Example
```typescript
const result = await new APIRequestBuilder('https://api.example.com', 'YOUR_TOKEN')
    .get()
    .setRelativePath('/users')
    .setQueryParameters({ limit: 10 })
    .execute();
```
```typescript
const result = await new APIRequestBuilder('https://api.example.com')
    .get()
    .setRelativePath("/some-endpoint")
    .setResponseType('arraybuffer')
    .execute();
```

```typescript
interface Todo {
    id: string;
    text: string;
}

const todoExamples: Todo[] = [
    {
        id: "1",
        text: "My First To-DO"
    },
    {
        id: "2",
        text: "My Second To-DO"
    }
];

const result = await new APIRequestBuilder('https://api.example.com')
    .post(todoExamples)
    .setRelativePath("/some-endpoint")
    .execute();
```

## Contributing
Contributions are welcome! Please read the CONTRIBUTING.md for guidelines.