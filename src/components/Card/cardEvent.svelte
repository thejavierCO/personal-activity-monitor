<script>
    import {createEventDispatcher,beforeUpdate} from "svelte"
    import Card from "./card.svelte";
    let emit = createEventDispatcher()
    export let status = "";
    export let title;
    export let description;
    export let id;
    let className
    beforeUpdate(e=>{
        switch(status){
            case "success":
                className="bg-green-500";
                break;
            case "waiting":
                className="bg-gray-500";
                break;
            case "diary":
                className="bg-blue-500";
                break;
            default:
                className = ""
        }
    })
</script>

<form action="#" on:submit|preventDefault={({target})=>emit("submit",target)} {id}>
    <Card {title} {description} {className}>
        <slot>
        </slot>
    </Card>
</form>
