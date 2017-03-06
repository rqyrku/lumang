export class User{
    private tokenUpdateTimeLeft: number = null;
    private tokenUpdateInterval:any;
    data:any = {};
    constructor(){
        this.tokenUpdateTimeLeft = parseInt(sessionStorage.getItem('token_update_time_left') || "0");
    }
    setData(data:any, resetTimer:boolean = false){
        this.data = data;
        if(resetTimer){
            this.tokenUpdateTimeLeft = this.data.exp - this.data.iat;
            this.saveTokenDetails();
        }
        this.runTimer();
    }
    private saveTokenDetails(){
        sessionStorage.setItem('token_update_time_left', this.tokenUpdateTimeLeft.toString());
    }
    private runTimer(){
        let intervalLength = 1000;
        clearInterval(this.tokenUpdateInterval);
        this.tokenUpdateInterval = setInterval(()=>{
            this.tokenUpdateTimeLeft -= intervalLength/1000;
            this.saveTokenDetails();
        }, intervalLength);
    }
    isNeedUpdateToken(){
        return this.tokenUpdateTimeLeft < 30*60;
    }
    getDisplayName(){
        if(!this.data.name){
            return '';
        }
        var nameParts = this.data.name.split(' ');
        if(nameParts.length === 1){
            return nameParts[0];
        }
        var displayName = '';
        for(var i = 0; i < nameParts.length - 1; i++){
            displayName += nameParts[i] + ' ';
        }
        displayName += nameParts[nameParts.length - 1][0] + '.';
        return displayName
    }
}
