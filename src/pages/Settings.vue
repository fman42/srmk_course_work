<template>
    <div id="settings">
        <b-container>
            <b-row>
                <b-col cols="4">
                    <h2>Настройки</h2>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">
                    <p>На данной странице вы можете изменить настройки вашего аккаунта</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">
                    <b-form-group id="input-group-2" label-align-md="left" label="Имя:" label-for="email">
                        <b-form-input
                            v-model="user.name"
                            placeholder="Ваше имя"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-button variant="success" class="mt-3" @click="changeName">Изменить</b-button>
                    <h2 class="mt-5">Изменение пароля</h2>
                    <b-form-group id="input-group-2" class="mt-3" label-align-md="left" label="Старый пароль:" label-for="email">
                        <b-form-input
                            v-model="user.old_password"
                            type="password"
                            placeholder="Старый пароль"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" class="mt-3" label-align-md="left" label="Новый пароль:" label-for="email">
                        <b-form-input
                            v-model="user.password"
                            type="password"
                            placeholder="Новый пароль"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-button variant="success" class="mt-3" @click="updatePassword">Обновить</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    const API = require('../api/local').default
    import { mapGetters } from 'vuex'

    export default {
        name: "Settings",
        data() {
            return {
                user: {
                    name: "",
                    old_password: null,
                    password: null
                }
            }
        },
        mounted() {
            this.user.name = this.getUser.name;
        },
        methods: {
            changeName() {
                API.changeField(this.getUser.email, 'name', this.user.name);
                this.$store.dispatch('updateData', {
                    data: {
                        name: this.user.name
                    }
                })
            },
            updatePassword() {
                if (this.user.old_password != this.getUser.password) {
                    return alert('Неверно введен старый пароль');
                }

                API.changeField(this.getUser.email, 'password', this.user.password);
                this.$store.dispatch('updateData', {
                    data: {
                        password: this.user.password
                    }
                })

                this.user.password = null;
                this.user.old_password = null;
                alert('Вы успешно изменили свой пароль');
            }
        },
        computed: {
            ...mapGetters([
                'getUser'
            ])
        }
    }
</script>

<style scoped>
    #settings {
        text-align: left;
    }
</style>