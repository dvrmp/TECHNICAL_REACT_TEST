import { EnhancedStore } from '@reduxjs/toolkit';
import { injectable } from "inversify";
import { MockStoreEnhanced } from 'redux-mock-store';
import { RootState, store as reduxStore } from '../redux/store';

@injectable()
export default class MemoryClient {

    private store: EnhancedStore | MockStoreEnhanced = reduxStore;

    public setStore(store: MockStoreEnhanced) {
        this.store = store;
    }

    get<Response>(node: string, key: string): Response {
        const state = this.store.getState() as RootState;
        const clone = JSON.parse(JSON.stringify(state));
        return clone[node][key] as Response;
    }

}