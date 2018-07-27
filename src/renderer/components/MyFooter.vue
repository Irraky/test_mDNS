<template>
  <div>
    <div class="input">
      <button v-on:click="clear">Clear</button>
      <!-- Used https://forum.vuejs.org/t/how-to-conditionally-add-attributes-to-tag-inside-v-for/12817 to keep one disable option-->
      <select v-model='selected'>
        <option v-for="option in spaces" :key="option.key" :value="option.value" :disabled="option.disabled">
          {{option.text}}
        </option>
      </select>
      <button v-on:click="check" v-if="selected" >Test my JSON</button>
    </div>
    <div  v-if="error" class='error'>
      {{ errortext }}
    </div>
    <router-link id="about" to="/About">About</router-link>
  </div>
</template>

<script>
import settings from '@/lib/settings'

const spaces = settings.spaces
export default {
  props: [
    'myjson'
  ],
  data: function () {
    return {
      selected: 2,
      error: false,
      spaces,
      errortext: ''
    }
  },
  methods: {
    check: function () {
      try {
        JSON.parse(this.myjson)
      } catch (err) {
        if (err) {
          this.error = true
          this.errortext = '' + err
          return
        }
      }
      this.error = false
      this.errortext = ''
      this.myjson = JSON.stringify(JSON.parse(this.myjson), null, this.selected)
      this.$emit('update', this.myjson)
    },
    clear: function () {
      this.myjson = ''
      this.$emit('update', this.myjson)
      this.error = false
      this.errortext = ''
    }
  }
}
</script>

<style>

.error {
  margin-top: 10px;
  color: rgb(0, 0, 0);
  padding: 5px;
  border: 2px solid rgb(255, 0, 0);
  background: rgba(255, 0, 0, 0.678);
  border-radius: 5px;
}

.input {
  margin-top: 20px;
}

#about {
  float: right;
  font-size: 2em;
  margin-right: 9%;
  color: #84c6d4;
}

</style>
