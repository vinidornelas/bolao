
import Axios, { AxiosInstance } from 'axios';

//import { Axios, AxiosInstance } from 'axios';

type ApiConfiguration = {
    accessToken: string;
}

class ErroCustomizado extends Error {
    public description;
    constructor(message: string, description: string) {
        super(message);
        this.description = description;
    }
}

export interface IApiClient {
    get<TResponse>(path: string): Promise<TResponse>;
    // --- post, patch, put, etc
}


export class HttpClient implements IApiClient {

    private client: AxiosInstance;

    protected createAxiosClient(
        apiConfiguration?: ApiConfiguration
    ): AxiosInstance {
        return Axios.create({
            headers: {
                'Content-Type': 'application/json',
                ...(apiConfiguration && apiConfiguration.accessToken && {
                    Authorization: `bearer ${apiConfiguration.accessToken}`,
                }),
            },
            timeout: 10 * 1000,
        });
    }

    constructor(apiConfiguration?: ApiConfiguration) {
        this.client = this.createAxiosClient(apiConfiguration);
    }

    async get<TResponse>(path: string): Promise<any> {
        try {
            const response = await this.client.get<TResponse>(path);
            return response.data;
        } catch (error: any) {
            // --- Logar erro da forma que for necessária
            throw new ErroCustomizado(
                error.message ? error.message : "Ocorreu um erro",
                `Path: ${path}`
            );
        }
    }

}