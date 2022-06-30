<template lang="html">
  <section class="content">
    <h2>User data</h2>
    <hr class="bg-white" />
    <table v-if="this.users.length" class="table table-dark">
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      <tr v-for="{ name, age, email, id } in users" :key="id">
        <td>{{ name }}</td>
        <td>{{ age }}</td>
        <td>{{ email }}</td>
        <td>
          <button class="btn btn-danger" @click="deleteUser(id)">delete</button>
        </td>
      </tr>
    </table>
    <span class="alert alert-secondary" v-if="this.users.length"
      >Count Users: {{ this.countUsers }}</span
    >
    <div
      v-else-if="!this.users.length"
      class="alert alert-warning"
      role="alert"
    >
      Users have not loaded.
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-users',
    props: ['usersAdd'],
    mounted () {
      this.getUsers();
    },
    data () {
      return {
        url: 'https://62bd9739bac21839b606c4c8.mockapi.io/users-management-project/users/',
        users: [],
        countUsers: 0
      }
    },
    methods: {
      async getUsers() {
        const users = fetch(this.url)
        users
        .then(res => res.json())
        .then(res => {
          this.users = res
          this.countUsers = this.users.length;
          console.log('THEN/CATCH GET users', res);
        if (this.users == 0) {
          this.$swal({
          icon: 'error',
          title: 'There are no users',
          })
        }
        })
        .catch(error => console.error(error.message))
        /* try {
          let { data: users } = await this.axios(this.url);
          this.users = users;
        } catch (error) {
          console.error(error.message);
        } */
      },
      async deleteUser(id) {
        try {
          let { data: user } = await this.axios.delete(
            this.url + id,
            { 'content-type': 'application/json' }
          );
          console.log('AXIOS DELETE user', user);
          let index = this.users.findIndex((user) => user.id == id);
          if (index == -1) throw new Error('Usuario no encontrado.');
          this.users.splice(index, 1);
          this.countUsers = this.users.length;
        } catch (error) {
          console.error('Error in deleteUser()', error.message);
        }
        this.$swal({
          icon: 'success',
          title: 'The user was deleted',
          })
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="css"></style>
