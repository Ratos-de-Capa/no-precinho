
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(path: string): Promise<T | undefined> {
        console.log("starting api service [get], path: ", path);
        return this.request<T>(path, HttpMethod.GET);
    }

    public async post<T>(path: string, body: any): Promise<T | undefined> {
        return this.request<T>(path, HttpMethod.POST, body);
    }

    public async put<T>(path: string, body: any): Promise<T | undefined> {
        return this.request<T>(path, HttpMethod.PUT, body);
    }

    public async delete<T>(path: string): Promise<T | undefined> {
        return this.request<T>(path, HttpMethod.DELETE);
    }

    public async request<T>(path: string, method: HttpMethod, body?: any): Promise<T | undefined> {
        console.log("starting api service [request], path: ", path, ", method: ", method, ", body: ", body)


        const response = await fetch(`${this.baseUrl}/${path}`, {
            method,
            body: method === HttpMethod.POST ? JSON.stringify(body) : null,
            headers: {},
        });

        if (!response.ok) {
            console.log(`Error ${response.status}: ${response.statusText}`);
            return undefined
        }

        return response.json();
    }
}