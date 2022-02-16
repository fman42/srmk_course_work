<template>
    <div id="login">
        <h2>Добро пожаловать!</h2>
        <div class="login">
            <b-row align-h="center">
                <b-col cols="2">
                    <form @submit="login">
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
                        
                        <div class="footer">
                            <a href="/password/reset">Восстановить пароль</a>
                            <b-button variant="outline-primary" class="mt-2" type="submit">Авторизация</b-button>
                        </div>
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
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            login(e) {
                e.preventDefault();

                const user = API.login(this.form.email, this.form.password);
                if (user == null) {
                    return alert('Вы ввели неверный логин или пароль');
                }

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

    .footer {
        display: flex;
        flex-direction: column;
    }
</style>
