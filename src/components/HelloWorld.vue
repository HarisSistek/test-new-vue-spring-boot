<template>
  <div class="container">

    <section>
      <h3 class="subtitle">Create new user</h3>
      <b-field>
        <b-input placeholder="Name" v-model="newName">
        </b-input>
      </b-field>

      <b-field>
        <b-input placeholder="Age"
                 v-model="newAge"
                 type="number">
        </b-input>
      </b-field>

      <b-button type="is-success" @click="createUser">Create</b-button>
    </section>

    <hr>
    <h3 class="subtitle">Users</h3>

    <b-table
        :data="filteredUsers"
        striped
        narrowed>

      <b-table-column field="name" label="Name" v-slot="props">
        <b-input v-model="props.row.name"></b-input>
      </b-table-column>

      <b-table-column field="age" label="Age" v-slot="props" numeric>
        <b-input v-model="props.row.age" type="number"></b-input>
      </b-table-column>

      <b-table-column field="edit" v-slot="props">
        <b-button @click="() => updateUser(props.row)" type="is-success">Save</b-button>
        <b-button @click="() => deleteUser(props.row)" type="is-danger">Delete</b-button>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No users</div>
      </template>

    </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      newName: '',
      newAge: '',
      users: []
    }
  },
  computed: {
    // a computed getter
    filteredUsers: function () {
      return this.users;
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('/user');
        console.log('users are here', response);
        this.users = response.data;
      } catch (error) {
        console.error('error here', error);
      }
    },
    async createUser() {
      try {
        await axios.post('/user', {
          name: this.newName,
          age: this.newAge
        });
        await this.getUsers();
      } catch (error) {
        console.error('error here', error);
      } finally {
        this.newName = '';
        this.newAge = '';
      }
    },
    async updateUser(user) {
      try {
        await axios.put('/user/' + user.uuid, {
          name: user.name,
          age: user.age
        });
        await this.getUsers();
      } catch (error) {
        console.error('error here', error);
      }
    },
    async deleteUser(user) {
      try {
        await axios.delete('/user/' + user.uuid);
        await this.getUsers();
      } catch (error) {
        console.error('error here', error);
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get('/user');
      console.log('users are here', response);
      this.users = response.data;
    } catch (error) {
      console.error('error here', error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
