import { v4 as uuid } from 'uuid'

class _StoreDirectivesService {

    private storages: Map<String,any> = new Map<String,any>()

    public createStore(): string {
        let id = uuid()
        while(this.storages.has(id)) {
            id = uuid()
        }
        this.storages.set(id,{})
        return id
    }
    public removeStore(id: string) {
        if(this.storages.has(id)) {
            this.storages.delete(id)
        }
        throw "Storage do not exist"
    }
    public getStore(id: string): any {
        if(this.storages.has(id)) {
            return this.storages.get(id)
        }
        throw "Storage do not exist"
    }
    public setStore(id: string, data: any) {
        if(this.storages.has(id)) {
            this.storages.set(id,data)
            return
        }
        throw "Storage do not exist"
    }
}

export const StoreDirectivesService = new _StoreDirectivesService()

