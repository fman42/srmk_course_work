<template>
    <div id="tickets">
        <b-container>
            <b-row>
                <b-col cols="4">
                    <h2>Поддержка</h2>
                    <b-button variant="success" v-b-modal="'add-ticket'">Создать обращение</b-button>
                </b-col>
            </b-row>
            <b-row v-for="ticket in tickets" v-bind:key="ticket.id">
                <b-col cols="8">
                    <Ticket class="ticket" @completed="updateTickets" :id="ticket.id" :name="ticket.name" :can_close="true" :body="ticket.body" :completed="ticket.completed == 1" />
                </b-col>
            </b-row>
        </b-container>
        <!-- Add Word Modal -->
        <b-modal 
            id="add-ticket"
            title="Добавление нового тикета"
            :hide-footer="true"
        >
            <form @submit="createTicket">
                <b-form-group
                    label="Название"
                    label-for="name-input"
                    >
                    <b-form-input
                        id="name-input"
                        v-model="ticket.name"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Содержание"
                    label-for="name-input"
                    >
                    <b-form-textarea
                        id="textarea"
                        v-model="ticket.body"
                        placeholder="Введите определение"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
                <b-button variant="success" type="submit">Добавить</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
    const API = require('../api/local').default
    import Ticket from '../components/Ticket.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: "Tickets",
        data() {
            return {
                tickets: [],
                ticket: {
                    name: null,
                    body: null
                }
            }
        },
        mounted() {
            this.tickets = API.getTickets(this.getUser.email);
        },
        computed: {
            ...mapGetters([
                'getUser'
            ])
        },
        methods: {
            createTicket(e) {
                e.preventDefault();

                API.createTicket(this.getUser.email, this.ticket.name, this.ticket.body);
                this.ticket = {
                    name: null,
                    body: null
                }

                this.$bvModal.hide('add-ticket');
                this.updateTickets();
            },
            updateTickets() {
                this.tickets = API.getTickets(this.getUser.email);
            }
        },
        components: {
            Ticket
        }
    }
</script>

<style>
    #tickets {
        text-align: left;
    }

    .ticket {
        margin-top: 25px;
    }
</style>