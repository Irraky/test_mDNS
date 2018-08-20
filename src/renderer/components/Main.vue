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
  <div :class="{serviceDetailDiv: true, serviceDivHidden: !focusedService}">
    <button class='closeButton' @click="closeDetailDiv"> X </button>
    <h2>{{ focusedService.name }}</h2>
    <p id='serviceDetail'></p>
  </div>
  </div>
</template>

<script>
const ipc = require('electron-better-ipc')

export default {
  data: function () {
    return {
      listServices: [],
      focusedService: ''
    }
  },
  methods: {
    closeDetailDiv: function () {
      document.getElementById('serviceDetail').innerText = ''
      this.focusedService = ''
    },
    serviceDetails: function (service) {
      this.focusedService = service
      var serviceData = ''
      for (var property1 in service) {
        if (property1 !== 'type' && property1 !== 'txtRecord' && property1 !== 'rawTxtRecord' && property1 !== 'name') {
          var detailName = property1.replace(/^\w/, function ($0) {
            return $0.toUpperCase()
          })
          serviceData = serviceData + detailName + ': ' + service[property1] + '\n'
        }
        if (property1 === 'rawTxtRecord') {
          console.log(service[property1].length)
          var txtRecord = property1 + ': ' + service[property1]
          serviceData = serviceData + txtRecord + '\n'
        }
      }
      document.getElementById('serviceDetail').innerText = serviceData
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
.serviceDivHidden {
  visibility: hidden;
}
.serviceDetailDiv {
  position: fixed;
  top: 15px;
  right: 15px;
  border: 2px solid #2d8cb4;
  background-color: #f2f2f2;
  padding: 4px;
  line-height: 16pt;
  max-height: 300px;
  max-width: 400px;
  overflow: auto;
}

h2 {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding-bottom: 5px;
}

.closeButton {
  float: right;
  border: #2d8cb4 1px solid;
  border-radius: 2px;
}

</style>