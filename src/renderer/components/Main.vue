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
      <tr v-for="service in listServices" v-bind:key="service.name + service.port + service.addresses">
        <td>{{ service.name | uppercase }}</td>
        <td>{{ service.port || service}}</td> 
        <td>{{ service.addresses }}</td>
      </tr>
    </tbody>
  </table>
  <tr v-for="service in listServices" v-bind:key="service.name + service.port + service.addresses">
    <td>{{ service.name | uppercase }}</td>
    <td>{{ service.port || service}}</td> 
    <td>{{ service.addresses }}</td>
  </tr>
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
  created () {
    this.listServices = []
    console.log('length: ', this.listServices.length)
    ipc.answerMain('send-services', async newService => {
      console.log('new: ', newService.name)
      this.listServices.push(newService)
      console.log('Result: ', this.listServices)
    })
    ipc.answerMain('change-services', async newService => {
      console.log('change: ', newService.name)
      this.listServices.push(newService)
    })
    ipc.answerMain('down-services', async newService => {
      console.log('down: ', newService.name)
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

th{
  font-weight: bold;
}

td{
  overflow: auto;
}
</style>