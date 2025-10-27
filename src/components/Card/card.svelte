<script>
    export let title;
    export let description;
    export let full = false;
    export let className;
    if(className==undefined || className=="")className = "bg-white"
</script>

<card class={"p-1 h-auto flex flex-col rounded-sm overflow-auto "+className} class:-col-start-1={full} class:col-end-1={full}>
    <slot name="title">
        <div class="flex flex-col items-center justify-center text-lg">
            {#if title}{title}{/if}
        </div>
    </slot>
    <slot name="description">
        <div class="flex flex-col text-base">
            {#if description}{description}{/if}
        </div>
    </slot>
    <slot></slot>
</card>