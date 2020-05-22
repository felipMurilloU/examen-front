<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns" :columns="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.username}}</td>
        <td>{{item.celular}}</td>
        <td>{{item.birth_date}}</td>
        <td> 
          <base-button type="primary" size="sm" @click="irDetalle(item)">Ver</base-button>
          <base-button type="danger" size="sm">Eliminar</base-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'base-table',

  props: {
    columns: {
      type: Array,
      default: () => [],
      description: 'Table columns'
    },
    data: {
      type: Array,
      default: () => [],
      description: 'Table data'
    },
    type: {
      type: String, // striped | hover
      default: '',
      description: 'Whether table is striped or hover type'
    },
    theadClasses: {
      type: String,
      default: '',
      description: '<thead> css classes'
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: '<tbody> css classes'
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
    colsWithValue() {
      return (row) => {
        return this.columns.filter(column => this.hasValue(row, column))
      }
    }
  },
  methods: {
    ...mapMutations(['setUserSelected']),
    hasValue(item, column) {
      return item[column] !== 'undefined';
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    irDetalle(item) {
      this.setUserSelected(item)
      this.$router.push('/users/new')
    }
  }
};
</script>
<style></style>
