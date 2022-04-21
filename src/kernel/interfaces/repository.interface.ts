export interface Repository<E> {
    getByPage(pageNumber: number): Promise<E[]>;
}