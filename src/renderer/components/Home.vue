<template>
  <div id="wrapper">
    <Header></Header>
    <MainContent :myjson="myjson" @update="onUpdate"></MainContent>
    <Footer :myjson="myjson" @update="onUpdate"></Footer>
  </div>
</template>

<script type="text/javascript">
import Header from '@/components/MyHeader'
import Footer from '@/components/MyFooter'
import MainContent from '@/components/Main'

export default {
  name: 'home',
  components: {
    Header,
    MainContent,
    Footer
  },
  data: function () {
    return {
      myjson: ''
    }
  },
  methods: {
    onUpdate (newdata) {
      this.myjson = newdata
    }
  }
}
</script>

<style>

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

body {
  font-family: "Source Sans Pro", sans-serif;
  overflow: hidden;
  overflow-y: visible;
}

#wrapper {
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

</style>