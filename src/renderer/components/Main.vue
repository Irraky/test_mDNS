<template>
  <div class="jsonarea">
  <table class="tableau">
    <thead>
      <tr>
        <th>Service Name</th>
        <th>Address</th>
        <th>Port</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="service in listServices" v-bind:key="service.name + service.port + service.addresses" @click="serviceDetails(service)">
        <td>{{ service.name }}</td>
        <td>{{ service.port }}</td> 
        <td>{{ service.addresses[0] }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
const ipc = require('electron-better-ipc')

export default {
  data: function () {
    return {
      listServices: []
    }
  },
  methods: {
    serviceDetails: function (service) {
      alert(JSON.stringify(service), service.name)
      console.log(service)
    }
  },
  created () {
    this.listServices = []
    ipc.answerMain('send-services', async newService => {
      if (newService.port && newService.name && newService.addresses[0]) {
        var exist = 0
        for (var i = 0; i < this.listServices.length; i++) {
          if (this.listServices[i].addresses[0] === newService.addresses[0] &&
          this.listServices[i].port === newService.port &&
          this.listServices[i].name === newService.name) {
            exist = 1
            break
          }
        }
        if (exist === 0) {
          this.listServices.push(newService)
        } else {
          this.listServices.splice(i, 1, newService)
        }
      }
    })
    ipc.answerMain('down-services', async newService => {
      console.log(newService)
      for (var i = 0; i < this.listServices.length; i++) {
        if (this.listServices[i].name === newService.name) {
          break
        }
      }
      this.listServices.splice(i, 1)
    })
  }
}
</script>

<style>
.jsonarea {
  display: inline-block;
  min-width: 200px;
}

table, td, th {    
    border: 1px solid #ddd;
    text-align: left;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 15px;
    
}

th {
  font-weight: bold;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #21abca;
  color: white;
}

tr:nth-child(even ){
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
td {
  overflow: auto; 
}
</style>