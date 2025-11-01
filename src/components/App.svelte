<script>
    import CardEvent from "../components/Card/cardEvent.svelte";
    import {uuidv4,tasks} from "../js/main"
    let db = tasks
    function add(target){
        let [{title},{description}] = (Array.from(target.querySelectorAll("input"))).filter(el=>el.type!=="submit").map(el=>({[el.id]:el.value}))
        let [{status}] = (Array.from(target.querySelectorAll("select"))).map(el=>({[el.id]:el.value}))
        let data = {title,description,status}
        let localdb = $db
        data.id = uuidv4()
        data.date = new Date().getTime()
        localdb.push(data)
        db.update(e=>localdb)
    }
    function complete(target){
        let localdb = $db
        localdb = localdb.map(el=>{
            if(el.id==target.id){
                el.status = target.querySelector("input[type=submit]").id
                return el
            }else return el
        })
        db.update(e=>localdb)
    }
    function remove(target){
        let localdb = $db
        localdb = localdb.filter(el=>el.id!=target.id)
        db.update(e=>localdb)
    }
</script>

{#each $db as {title,description,status,id}}
    <CardEvent {title} {description} bind:status {id} on:submit={({detail})=>{
        let type = detail.querySelector("input[type=submit]").id
        if(type=="success")complete(detail)
        else if(type=="delete")remove(detail)
    }}>
        {#if status != "diary"}
            {#if status == "waiting"}
                <input type="submit" id="success" value="Completado" class="font-mono text-base bg-white hover:bg-gray-200 active:bg-inherit"/>
            {:else}
                <input type="submit" id="delete" value="Eliminar">
            {/if}
        {/if}
    </CardEvent>
{/each}

<CardEvent title="Agregar Actividad" className="bg-white text-lg" on:submit={({detail})=>add(detail)}>
    <label for="title"><span>Titulo:</span></label>
    <input type="text" name="title" id="title" placeholder="Titulo de la actividad" required/>
    <label for="description"><span>Descripcion:</span></label>
    <input type="text" name="description" id="description" placeholder="Descripcion de la actividad" required/>
    <label for="status"><span>Estado:</span></label>
    <select name="select" id="status" required>
        <option value="diary" selected>Diario</option>
        <option value="waiting">En Proceso</option>
    </select>
    <input type="submit" value="Agregar">
</CardEvent>