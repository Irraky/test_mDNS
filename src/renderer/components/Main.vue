<template>
  <div>
    <div class="jsonarea">
      <div v-for="service in listServices" v-bind:key="service.name">
          {{service.name}}<br>
      </div>
      <!-- used ref as in API https://vuejs.org/v2/api/  -->
      <div id="myscroll" v-on:scroll="keymonitor" ref="myscroll">
        0 <br>
        <span v-for="line in lines"> {{line}} <br> </span>
        <br>
      </div>
      <textarea v-model="myjson" ref="text" id="text" type="text" placeholder="Place your JSON here"
        v-on:scroll="keymonitor" v-on:keyup="keymonitor" v-on:keydown="keymonitor">
      </textarea>
    </div>
    <div class="button">
     <button v-on:click="treechange">JSON to Tree</button>
     <button v-on:click="jsonchange" >Tree to JSON</button>
    </div>
    <vue-json-editor class="jsontree" v-model="json" :show-btns="true" @json-change="onJsonChange"></vue-json-editor>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
const ipc = require('electron-better-ipc')

function newServices (service, listServices) {
  if (service.port) {
    console.log(listServices.indexOf(service))
    let newService = {}
    newService.name = service.fullname.split('.')[0]
    newService.id = service.addresses[0]
    newService.port = service.port
    if (listServices.indexOf(newService.Name) === -1) {
      listServices.push(newService)
    } else {
      console.log('out')
    }
  }
  console.log(listServices)
}

export default {
  components: {
    vueJsonEditor
  },
  props: [
    'myjson'
  ],
  data: function () {
    return {
      listServices: [{'name': 'Service Name', 'id': 'Address', 'port': 'Port'}],
      lines: 0,
      json: {
        msg: 'json verifier'
      }
    }
  },
  methods: {
    keymonitor: function (event) {
      if (this.$refs.text.value.match(/[\r\n]/g)) {
        this.lines = this.$refs.text.value.match(/[\r\n]/g).length
      } else {
        this.lines = 0
      }
      if (this.$refs.text.scrollTop != null) {
        this.$refs.myscroll.scrollTop = this.$refs.text.scrollTop + 2
      }
      this.$emit('update', this.myjson)
    },
    jsonchange: function () {
      console.log(this.myjson)
      this.myjson = JSON.stringify(this.json)
      console.log(this.myjson)
      this.$emit('update', this.myjson)
    },
    treechange: function () {
      this.json = JSON.parse(this.myjson, null, 2)
    },
    onJsonChange (value) {
      console.log('value:', value)
    }
  },
  created () {
    ipc.answerMain('send-service', async newService => {
      console.log('service', newService)
      await newServices(newService, this.listServices)
    })
  }
}
</script>

<style>

textarea {
  background-color: rgb(251, 251, 255);
  padding: 3px;
  border: 1px solid rgba(0, 102, 255, 0.514);
  border-block-start-color: blue;
  height: 611px;
  width: calc(90% - 45px);
  resize: none;
  overflow-y: hidden;
  overflow-x: hidden;
  display: inline-block;
  margin-left: -10px;
  font-size: 16px;
  line-height: 20px;
  font-family: "Source Sans Pro", sans-serif;
  wrap: off;
  white-space: pre;
}

.jsontree {
  background-color: rgb(251, 251, 255);
  padding: 3px;
  border: 1px solid rgba(0, 102, 255, 0.514);
  border-block-start-color: blue;
  height: 611px;
  width: 40%;
  resize: none;
  overflow: hidden;
  display: inline-block;
  font-size: 16px;
  line-height: 20px;
  font-family: "Source Sans Pro", sans-serif;
}

textarea:focus {
  caret-color: #21abfa;
  overflow: visible;
}

#myscroll {
  background-color: rgb(226, 226, 226);
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  color: rgb(99, 51, 187);
  float: left;
  padding-top: 4px;
  padding-left: 22px;
  padding-bottom: 9px;
  width: 45px;
  height: 606px;
  scroll-behavior: unset;
  overflow: hidden;
}

.jsonarea {
  display: inline-block;
  width: 40%;
  min-width: 200px;
}

.button {
  display: inline-block;
  margin-right: 20px;
}

</style>
