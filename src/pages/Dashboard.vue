<template>
    <div id="dashboard">
        <b-container>
            <b-row class="welcome">
                <b-col cols="12">
                    <h4>
                        Добро пожаловать, {{ getUser.name }}
                    </h4>
                    <h4 class="mt-5">
                        Ваши слова: <b-button variant="success" v-b-modal="'add-word'">Добавить новое слово</b-button>
                    </h4>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col cols="3" v-for="word in words" v-bind:key="word.id">
                    <b-card-group deck>
                        <edit-word-modal :id="word.id" :title="word.title" :description="word.description" @wordChanged="wordChanged" />
                        <b-card
                            border-variant="primary"
                            :header="word.title"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="start"
                            class="mt-3"
                        >
                            <b-card-text>
                                {{ word.description }}
                            </b-card-text>
                            <div class="card__buttons">
                                <b-button href="#" variant="danger" @click="deleteWord(word.id)">Удалить</b-button>
                                <b-button href="#" variant="primary" class="mt-3" @click="openEditWordModal(word.id)">Редактировать</b-button>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
        <div>
            <!-- Add Word Modal -->
            <b-modal 
                id="add-word"
                title="Добавление нового слова"
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
                    <b-button variant="success" type="submit">Добавить</b-button>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
    const API = require('../api/local').default
    import { mapGetters } from 'vuex'
    import EditWordModal from '../components/EditWordModal.vue'

    export default {
        data() {
            return {
                words: [],
                word: {
                    title: null,
                    description: null
                }
            }
        },
        methods: {
            deleteWord(id) {
                API.deleteWord(this.getUser.email, id);
                this.words = API.getWords(this.getUser.email);
            },

            handleOk(e) {
                e.preventDefault();
                API.addWord(this.getUser.email, this.word.title, this.word.description);

                this.word = {
                    title: null,
                    description: null
                }

                this.words = API.getWords(this.getUser.email);
                this.$bvModal.hide('add-word');
            },

            openEditWordModal(id) {
                this.$bvModal.show(id);
            },

            wordChanged(id) {
                this.$bvModal.hide(id);
                this.words = API.getWords(this.getUser.email);
            }
        },
        computed: {
            ...mapGetters([
                'getUser'
            ])
        },
        mounted() {
            this.words = API.getWords(this.getUser.email);
        },
        components: {
            EditWordModal
        }
    }
</script>

<style scoped>
    .welcome {
       text-align: left;
    }
    
    .card__buttons {
        display: flex;
        flex-direction: column;
        width: 70%;
        margin: 0px auto;
    }
    
</style>