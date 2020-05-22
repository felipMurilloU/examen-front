<template>
    <div>
        <base-header class="header pb-3 pt-2 pt-lg-3 d-flex align-items-center"
                     style="min-height: 200px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Usuario</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary" @click="saveUser">Guardar</a>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Usuario Informacion</h6>
                                <div class="row">
                                  <div class="col-md-12">
                                    <base-input alternative=""
                                      label="Nombre  Completo"
                                      name="name"
                                      placeholder="Nombre Completo"
                                      input-classes="form-control-alternative"
                                      v-model="user.name"
                                      @input="setUserValues($event.target)"
                                      @change="setUserValues($event.target)"
                                    />
                                  </div>
                                </div>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                              label="Nombre de Usuario"
                                              name= "username"
                                              placeholder="Username"
                                              input-classes="form-control-alternative"
                                              v-model="user.username"
                                              @input="setUserValues($event.target)"
                                              @change="setUserValues($event.target)"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                              id="password"
                                              label="Password"
                                              name="password"
                                              required
                                              placeholder="*********"
                                              type="password"
                                              v-model="user.password"
                                              @input="setUserValues($event.target)"
                                              @change="setUserValues($event.target)"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                              label="Celular"
                                              name="celular"
                                              placeholder="Celular"
                                              input-classes="form-control-alternative"
                                              v-model="user.celular"
                                              @input="setUserValues($event.target)"
                                              @change="setUserValues($event.target)"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                              name="birth_date"
                                              label="Fecha Nacimiento"
                                              placeholder="Last name"
                                              input-classes="form-control-alternative"
                                              v-model="user.birth_date"
                                              @input="setUserValues($event.target)"
                                              @change="setUserValues($event.target)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'user-profile',
    computed: {
      ...mapState({ user: state => state.users.selected })
    },
    methods:  {
      ...mapActions(['saveUser']),
      ...mapMutations(['setUserValues'])
    },
  };
</script>
<style></style>
