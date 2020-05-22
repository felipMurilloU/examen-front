<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Logeate con tu cuenta</small></div>
                        <!-- <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div> -->
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small> Iniciar con las credenciales </small>
                        </div>
                        <form @submit.prevent="login">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Nombrbe usuario"
                                        id="username"
                                        name="username"
                                        v-model="authentication.username"
                                        @input="setAuthenticationValue($event.target)"
                                        @change="setAuthenticationValue($event.target)">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="*********"
                                        type="password"
                                        v-model="authentication.password"
                                        @input="setAuthenticationValue($event.target)"
                                        @change="setAuthenticationValue($event.target)">
                            </base-input>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="login">Entrar</base-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'login',
  computed: {
    ...mapState({ authentication: state => state.authentication })
  },
  methods: {
    ...mapMutations(['setAuthenticationValue']),
    ...mapActions(['login'])
  },
  beforeDestroy () {
    this.setAuthenticationValue({ name: 'password', value: '' })
  }
}
</script>
<style>
</style>
