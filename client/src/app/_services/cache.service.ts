import {Injectable} from '@angular/core';

@Injectable()
export class CacheService{
    private storage:any = {
        session: sessionStorage,
        local: sessionStorage,
        memory: {}
    };
    constructor(){}
    private addToMemory(key:string, data:any){
        this.storage.memory[key] = data;
    }
    private addToSession(key:string, data:any){
        this.storage.session.setItem(key, JSON.stringify(data))
    }
    private addToLocal(key:string, data:any){
        this.storage.local.setItem(key, JSON.stringify(data))
    }
    private getFromMemory(key:string){
        return this.storage.memory[key];
    }
    private getFromSession(key:string){
        let data = this.storage.session.getItem(key);
        if(!!data){
            return JSON.parse(data);
        } else {
            return null;
        }
    }
    private getFromLocal(key:string){
        let data = this.storage.local.getItem(key);
        if(!!data){
            return JSON.parse(data);
        } else {
            return null;
        }
    }
    reset(type: string = 'memory'){
        switch(type){
            case 'memory':
                this.storage.memory = {};
                break;
            case 'session':
                this.storage.session.clear();
                break;
            case 'local':
                this.storage.local.clear();
                break;
        }
    }
    add(key:string, data:any, storage:string = 'memory'):any{
        switch(storage){
            case 'memory':
                return this.addToMemory(key, data);
            case 'session':
                return this.addToSession(key, data);
            case 'local':
                return this.addToLocal(key, data);
        }
    }
    get(key:string, storage:string = 'memory'):any{
        switch(storage){
            case 'memory':
                return this.getFromMemory(key);
            case 'session':
                return this.getFromSession(key);
            case 'local':
                return this.getFromLocal(key);
        }
    }
    remove(key:string){
        //TODO
        this.storage.memory = {};
    }
}
