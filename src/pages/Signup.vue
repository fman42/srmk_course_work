<template>
    <div id="login">
        <h2>Добро пожаловать!</h2>
        <div class="login">
            <b-row align-h="center">
                <b-col cols="2">
                    <form @submit="signup">
                        <b-form-group id="input-group-2" label-align-md="left" label="Ваша почта:" label-for="name">
                            <b-form-input
                                id="name"
                                v-model="form.name"
                                placeholder="Ваше имя"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div class="mt-5"></div>
                        <b-form-group id="input-group-2" label-align-md="left" label="Ваша почта:" label-for="email">
                            <b-form-input
                                id="email"
                                v-model="form.email"
                                placeholder="Ваша почта"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <div class="mt-5"></div>
                        <b-form-group id="input-group-2" label-align-md="left" label="Ваш пароль:" label-for="password">
                            <b-form-input
                                id="password"
                                v-model="form.password"
                                placeholder="Ваш пароль"
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-button variant="outline-primary" class="mt-5" type="submit">Регистрация</b-button>
                    </form>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    const API = require('../api/local').default;

    export default {
        data() {
            return {
                form: {
                    name: "",
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            signup(e) {
                e.preventDefault();

                if (API.checkUserExists(this.form.email)) {
                    return alert('Произошла ошибка! Данная почта уже занята другим пользователем');
                }

                API.createUser(this.form.email, this.form.password, this.form.name);
                alert('Вы успешно прошли регистрацию!');

                const user = this.form;
                this.$store.dispatch('login', {user});
                this.$router.push('/dashboard');
            }
        }
    }
</script>

<style scoped>
    #login {
        margin-top: 5%;
    }

    .login {
        margin-top: 50px;
    }
</style>
