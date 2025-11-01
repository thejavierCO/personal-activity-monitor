export class Basket{
    constructor(name,Parent){
        this.Parent = Parent;
        this.token = Parent.token;
        this.url = Parent.url+"/basket/"+name;
        this.name = name;
    }
    get data(){
        return this.get().then(e=>e.tasks)
    }
    set data(data){
        this.post({tasks:data})
    }
    get(){
        return this.Parent.call("GET",this.url)
    }
    post(data){
        return this.Parent.call("POST",this.url,data)
    }
}

export default class Pantry{
    constructor(token){
        this.token = token;
        this.url = "https://getpantry.cloud/apiv1/pantry/"+token;
    }
    call(method,url,data){
        const options = data?{method:method,
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }:{method:method}
        return fetch(url,options).then(e=>{
            if(method=="GET")return e.json();
            else return e.text();
        })
    }
    Basket(name){
        return new Basket(name,this)
    }
}