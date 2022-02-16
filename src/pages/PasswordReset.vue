<template>
    <div id="password_reset">
        <h2>Восстановление пароля!</h2>
        <div class="login">
            <b-row align-h="center">
                <b-col cols="2">
                    <form @submit="handle">
                        <p>Введите почту от аккаунта, к которому хотите восстановить доступ. На его почту придет письмо с дальнейшей инструкцией</p>
                        <b-form-input
                            id="email"
                            v-model="form.email"
                            placeholder="Ваша почта"
                            required
                        ></b-form-input>                      
                        <div class="footer">
                            <b-button variant="outline-primary" class="mt-2" type="submit">Восстановить</b-button>
                        </div>
                    </form>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PasswordReset",
        data() {
            return {
                form: {
                    email: null
                }
            }
        },
        methods: {
            handle(e) {
                e.preventDefault();

                alert('На почту аккаунта была отправлена инструкция');
                this.email = null;
                this.$router.push('/');
            }
        }
    }
</script>