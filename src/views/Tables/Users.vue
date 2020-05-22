<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @click="irNuevo">Nuevo Usuario</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="users">
        <template slot="columns">
          <th>Nombre Completo</th>
          <th>Nombre de Usuario</th>
          <th>Celular</th>
          <th>Fecha Nacimiento</th>
          <th></th>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'users-table',
    computed: {
      ...mapState({ users: state => state.users.items })
    },
    methods: {
      ...mapMutations(['setUserSelected']),
      irNuevo() {
        this.setUserSelected({});
        this.$router.push('/users/new')
      }
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
      }
    }
  }
</script>
<style>
</style>
