<template>
    <div>
        <!-- Edit Word Modal -->
        <b-modal 
            :id="id"
            :title="'Редактирование слова ' + title"
            :hide-footer="true"
        >
            <form @submit="handleOk">
                <b-form-group
                    label="Слово"
                    label-for="name-input"
                    >
                    <b-form-input
                        id="name-input"
                        v-model="word.title"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Определение"
                    label-for="name-input"
                    >
                    <b-form-textarea
                        id="textarea"
                        v-model="word.description"
                        placeholder="Введите определение"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
                <b-button variant="success" type="submit">Редактировать</b-button>
            </form>
        </b-modal>
    </div>
</template>

<script>
    const API = require('../api/local').default
    import { mapGetters } from 'vuex'

    export default {
        name: 'EditWordModal',
        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                word: {
                    title: null,
                    description: null
                }
            }
        },
        mounted() {
            this.word.title = this.title;
            this.word.description = this.description;
        },
        computed: {
            ...mapGetters([
                'getUser'
            ])
        },
        methods: {
            handleOk(e) {
                e.preventDefault();

                API.editWord(this.getUser.email, this.id, this.word.title, this.word.description);
                this.$emit('wordChanged', this.id);
            }
        }
    }
</script>