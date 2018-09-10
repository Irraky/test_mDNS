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
        <tr v-for="service in serviceList" v-bind:key="service.name + service.port + service.addresses" @click="serviceDetails(service)">
          <td>{{ service.name }}</td>
          <td>{{ service.port }}</td> 
          <td>{{ service.addresses[0] }}</td>
        </tr>
      </tbody>
    </table>
    <div v-show="focusedService" class="serviceDetailDiv">
      <button class='closeButton' @click="closeDetail"> X </button>
      <h2>{{ focusedService.name }}</h2>
      <p v-html="focusedServiceDetails"></p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
const ipc = require('electron-better-ipc')

export default {
  data: function () {
    return {
      focusedService: '',
      focusedServiceDetails: ''
    }
  },
  computed: {
    ...mapGetters({
      serviceList: 'serviceList'
    })
  },
  methods: {
    ...mapActions(['addService']),
    closeDetail: function () {
      document.getElementById('serviceDetail').innerText = ''
      this.focusedService = ''
      this.focusedServiceDetails = ''
    },
    serviceDetails: function (service) {
      this.focusedService = service
      var serviceData = ''
      for (var property1 in service) {
        if (property1 !== 'type' && property1 !== 'txtRecord' && property1 !== 'rawTxtRecord' && property1 !== 'name') {
          var detailName = property1.replace(/^\w/, function ($0) {
            return $0.toUpperCase()
          })
          serviceData = serviceData + detailName + ': ' + service[property1] + '<br>'
        }
        if (property1 === 'rawTxtRecord') {
          console.log(service[property1].length)
          var txtRecord = property1 + ': ' + service[property1]
          serviceData = serviceData + txtRecord + '<br>'
        }
      }
      this.focusedServiceDetails = serviceData
    }
  },
  created () {
    ipc.answerMain('send-services', async newService => {
      if (newService.port && newService.name && newService.addresses[0]) {
        this.addService(newService)
      }
    })
    ipc.answerMain('down-services', async newService => {
      this.removeService(newService)
    })
  }
}
</script>

<style>
.jsonarea {
  display: block;
  min-width: 200px;
  text-align: center;
}

table, td, th {
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
}

th, td {
  padding: 15px;
}

th {
  font-weight: bold;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #21abca;
  color: white;
}

tr:nth-child(even){
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
  bottom: 30px;
  right: 30px;
  border: 2px solid #2d8cb4;
  background-color: #f2f2f2;
  padding: 4px;
  line-height: 16pt;
  max-height: 300px;
  max-width: 400px;
  overflow: auto;
  text-align: left;
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