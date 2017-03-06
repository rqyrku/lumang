export class Pull{
    private pull:any[] = [];
    private state:string = 'wait';
    constructor(private timeout:number = 0){
        this.done = this.done.bind(this);
    }
    private nextTick(){
        if(this.timeout){
            setTimeout(function(){
                this.runNext();
            }.bind(this), this.timeout);
        } else {
            this.runNext();
        }
    }
    private runNext(){
        this.state = 'in-process';
        this.pull.shift()(this.done);
    }
    private done(){
        this.state = 'wait';
        if(this.pull.length){
            this.nextTick();
        }
    }
    reset(){
        this.pull = [];
        this.state = 'wait';
    }
    add(func:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.pull.push((done:any)=>{
                let value = func();
                if(value instanceof Promise){
                    value.then((arg:any)=>{
                        resolve(arg);
                        done();
                    },(arg:any)=>{
                        reject(arg);
                        done();
                    });
                } else {
                    resolve(value);
                    done();
                }
            });
            if(this.state === 'wait'){
                this.nextTick();
            }
        });
    }

}
