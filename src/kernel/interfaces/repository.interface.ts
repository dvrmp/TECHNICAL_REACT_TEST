export interface Repository<E> {
    getByPage(numberPage: number): Promise<E[]>;
}