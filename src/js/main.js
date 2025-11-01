import localStorageDb from "./store/localstore";
import Pantry from "./simplePantryDb";
import { writable } from "svelte/store"

const CtrlDb = new localStorageDb()

const tokenKey = CtrlDb.add("token")

if(tokenKey.data == null)tokenKey.data = prompt("Token key");

const PantryDb = new Pantry(tokenKey.data);

const Tasks = PantryDb.Basket("Testing");

const db = CtrlDb.add("tasks").defaultData("[]")
const sync = CtrlDb.add("sync").defaultData("false")


export const tasks = writable(db.toJSON(),async (set,update)=>{
    update((data)=>{
        sync.data = JSON.stringify(false);
        Tasks.data.then(db=>{
            if(!db){
                db = [];
                Tasks.data = []
            }
            if(JSON.stringify(db)!==JSON.stringify(data))set(db)
            sync.data = JSON.stringify(true)
            if(document.hasFocus())setInterval(()=>Tasks.data.then(db=>{
                if(JSON.stringify(db)!==JSON.stringify(data))set(db)
                sync.data = JSON.stringify(true)
            }),15000)
        })
        return data
    })
})

db.StorageUpdate(({newValue,oldValue})=>{
    if(newValue!=oldValue){
        sync.data = JSON.stringify(false);
        tasks.set(JSON.parse(newValue))
        sync.data = JSON.stringify(true);
    }
})

tasks.subscribe(e=>{
    if(sync.toJSON()==true){
        db.data = JSON.stringify(e)
        Tasks.data = e
    }
})

export const LoadDb = ()=>PantryDb.Basket("Testing").get();

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}