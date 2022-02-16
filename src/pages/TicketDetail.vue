<template>
    <b-container id="ticket_detail">
        <b-row>
            <div>
                <Ticket class="ticket" :id="ticket.id" @completed="ticket.completed = 1" :name="ticket.name" :can_close="true" :body="ticket.body" :completed="ticket.completed == 1" />
            </div>
        </b-row>
        <b-row>
            <h4 class="mt-5">Сообщения:</h4>
        </b-row>
        <div>
            <b-row v-for="message in messages" v-bind:key="message.id">
                <div>
                    <p>{{ message.email }}</p>
                    <p class="mt-2">{{ message.message }}</p>
                </div>
            </b-row>
        </div>
        <b-row v-if="ticket.completed == 0">
            <b-col cols="9" style="padding-left: 0px;">
                <div>
                    <b-form-textarea
                        id="textarea"
                        v-model="message_out.text"
                        placeholder="Введите сообщение"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                    <b-button variant="success" class="mt-3" @click="addTicketMessage" type="submit">Отправить</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    const API = require('../api/local').default
    import Ticket from '../components/Ticket.vue'

    export default {
        name: "TicketDetail",
        data() {
            return {
                ticket_id: null,
                ticket: null,
                messages: [],
                message_out: {
                    text: null
                }
            }
        },
        methods: {
            addTicketMessage() {
                API.addTicketMessage(this.ticket_id, this.ticket.email, this.message_out.text);
                this.messages = API.getTicketMessasges(this.ticket_id);
                this.message_out.text = null;
            }
        },
        created() {
            this.ticket_id = this.$route.params.id;
            this.ticket = API.getTicket(this.ticket_id);
            this.messages = API.getTicketMessasges(this.ticket_id);
        },
        components: {
            Ticket
        }
    }
</script>

<style>
    #ticket_detail {
        text-align: left;
    }
</style> 