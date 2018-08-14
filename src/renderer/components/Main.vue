<template>
  <div class="jsonarea">
    <div v-for="service in listServices" v-bind:key="service.name + service.port + service.addresses">
      {{service.name}} {{service.port}}  {{service.addresses}}<br>
    </div>
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
    this.listServices.push({'name': 'Service Name', 'id': 'Address', 'port': 'Port'})
    console.log('length: ', this.listServices.length)
    ipc.answerMain('send-services', async newService => {
      if (this.listServices.indexOf(newService) === -1) {
        if (newService.port) {
          console.log('new: ', newService.name)
          this.listServices.push({newService})
        }
      }
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
  width: 40%;
  min-width: 200px;
}

</style>
