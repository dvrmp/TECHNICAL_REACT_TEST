export interface Logger {
    write(message: string, level: number): void;
}