<template>
    <div :id="'ticket_' + id">
        <h4 v-if="completed == false"><a :href="'/tickets/' + id">{{ name }}</a></h4>
        <h4 v-else class="throguht_text">{{ name }}</h4>
        <p>{{ body }}</p>
        <b-button variant="danger" @click="close" v-if="completed == false && can_close">Закрыть тикет</b-button>
    </div>
</template>

<script>
    const API = require('../api/local').default

    export default {
        name: "Ticket",
        props: {
            id: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String
            },
            body: {
                required: true,
                type: String
            },
            completed: {
                required: true,
                type: Boolean
            },
            can_close: {
                required: false,
                type: Boolean,
                default: false
            }
        },
        methods: {
            close() {
                API.completeTicket(this.id);
                this.$emit('completed');
            }
        }
    }
</script>

<style>
    .throguht_text {
        text-decoration: line-through;
    }
</style>