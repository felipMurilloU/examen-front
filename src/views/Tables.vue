<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
            
            </div>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <users title="Usuarios"></users>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Users from './Tables/Users'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'tables',
  computed: {
    ...mapState({ users: state => state.users })
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    ...mapMutations(['setAuthenticationValue']),
    ...mapActions(['getUsers'])
  },
  components: {
    Users
  }
};
</script>
<style></style>
