import axios from "axios";

/**
 * The APIRequestBuilder provides a fluent interface for constructing
 * API requests using HTTP methods, headers, query parameters, and more.
 */
export default class APIRequestBuilder {
    private method: string = 'GET';
    private baseUrl: string;
    private resource: string = '';
    private headers: Record<string, string> = {};
    private data?: any;
    private queryParams: Record<string, string | number> = {};
    private responseType: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' = 'json';

    /**
     * Constructs a new APIRequestBuilder instance.
     * @param baseUrl - The base URL for the API endpoint.
     * @param token - Optional authentication token to be used in the request headers.
     */
    constructor(baseUrl: string, private token?: string) {
        this.baseUrl = baseUrl;

        if (this.token) {
            this.headers.Authorization = `Bearer ${token}`;
        }
    }

    /**
     * Sets the request method to GET.
     */
    get(): this {
        this.method = 'GET';
        return this;
    }

    /**
     * Sets the request method to POST and sets the request data.
     * @param data - The data to be sent with the request.
     */
    post(data: any): this {
        this.method = 'POST';
        this.data = data;
        return this;
    }

    /**
     * Sets the request method to PUT and sets the request data.
     * @param data - The data to be sent with the request.
     */
    put(data: any): this {
        this.method = 'PUT';
        this.data = data;
        return this;
    }

    /**
     * Sets the request method to DELETE.
     */
    delete(): this {
        this.method = 'DELETE';
        return this;
    }

    /**
     * Sets the request method to PATCH and sets the request data.
     * @param data - The data to be sent with the request.
     */
    patch(data: any): this {
        this.method = 'PATCH';
        this.data = data;
        return this;
    }

    /**
     * Updates the base URL for the request.
     * @param url - The new base URL.
     */
    setBaseUrl(url: string): this {
        this.baseUrl = url;
        return this;
    }

    /**
     * Sets the relative path for the resource being requested.
     * @param resourcePath - The relative path to the resource.
     */
    setRelativePath(resourcePath: string): this {
        this.resource = resourcePath;
        return this;
    }

    /**
     * Sets query parameters for the request.
     * @param params - An object representing key-value pairs for query parameters.
     */
    setQueryParameters(params: Record<string, string | number>): this {
        this.queryParams = params;
        return this;
    }


    /**
     * Updates the authorization token for the request headers.
     * @param token - The authentication token.
     */
    setToken(token: string): this {
        this.headers.Authorization = `Bearer ${token}`;
        return this;
    }

    /**
     * Sets the expected response type for the request.
     * @param type - The expected response type (e.g., 'json', 'blob', etc.).
     */
    setResponseType(type: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'): this {
        this.responseType = type;
        return this;
    }

    /**
     * Executes the API request with the previously defined configurations.
     * @returns A promise that resolves with the axios response.
     * @throws An error if the request fails or any critical component is missing.
     */
    async execute(): Promise<any> {
        this.validateRequestComponents();

        try {
            return await axios({
                method: this.method,
                url: `${this.baseUrl}${this.resource}`,
                data: this.data,
                headers: this.headers,
                params: this.queryParams,
                responseType: this.responseType
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validates that the critical components needed to execute the request are set.
     * @throws An error if any critical component is missing.
     */
    private validateRequestComponents() {
        if (!this.baseUrl) {
            throw new Error('Base URL is missing. Use setBaseUrl() to set it.');
        }
    }
}

export { APIRequestBuilder };
