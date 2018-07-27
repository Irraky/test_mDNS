<template>
  <div>
    <h1 id="logodiv">About</h1>
    <div class="abouttext">
      <h2>Why</h2>
      <p>
        I made this site to learn more things about JS and to have something to check and format my JSON quickly.
        <br>
        The tree structure is here to make everyone understand and modify the JSON easily.
      </p>
      <h2>Who</h2>
      <button @click='coin'>hhry</button>
      <p>
        Irraky, from <a href="http://www.soixantecircuits.fr/">Soixante circuits</a>
      </p>
      <h2>How</h2>
      <p>
        This website is made on JavaScript with electron-vue. I used the framework vue-cli with the template webpack.<br>
        For the settings, I used <a href="https://www.npmjs.com/package/standard-settings">standard-settings</a> that is integrated when creating the project with 'vue init soixantecircuits/electron-vue my-project'.<br>
        (For more informations, take a look to <a href="https://github.com/soixantecircuits/electron-vue">the electron-vue fork from Soixante circuits</a>).<br>
        And to show a json-tree, I used the package <a href="https://www.npmjs.com/package/vue-json-editor">vue-json-editor</a>
      </p>
    </div>
    <img id="logo" src="~@/assets/logo_sc.png" alt="logo Soixante circuits">
    <footer>
      <router-link id="home" to="/Home">Home Page</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'about',
  data: function () {
    return {
    }
  },
  methods: {
    coin: function () {
      console.log('coin')
    }
  }
}
</script>

<style>

  h2 {
    color: #2389d6;
    margin-bottom: 10px;
    font-size: 2em;
    font-family: "Source Sans Pro", sans-serif;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.5em;
    font-family: "Source Sans Pro", sans-serif;
  }

  footer {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }

  #logodiv {
    margin-top: 3%;
    color: #216aca;
    text-align: center;
    font-size: 3em;
    margin-bottom: 35px;
  }

  #home {
    color: #104a91;
    font-size: 2em;
  }

  #logo {
    margin-top: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .abouttext {
    width: 40%;
    text-align: justify;
    margin-left: 30%;
    margin-bottom: 10px;
  }

</style>