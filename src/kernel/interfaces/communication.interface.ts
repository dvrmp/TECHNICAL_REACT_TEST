export interface Communication {
    get<Response>(path: string): Promise<Response>;
}