<template>
  <div class="home">
    <img src="/favicon.svg" alt="">
    <h1>Bertrand's Quest</h1>
    <p>Enter player name :</p>
    <input class="nes-input" type="text" v-model='$store.state.player.name'>
    <router-link to="/select-weapon"><button class="nes-btn">Start new game</button></router-link>
    <small>Ce projet a été réalisé dans le cadre du Space Office Hackaton 2021. L'entièreté a été conçu, designé et codé en moins de 30h, tout n'est donc pas forcément au point 😊</small>
    <small style="text-align:center">Made by <a target="_blank" href="https://www.linkedin.com/in/antoine-gowie/">Antoine Gowie</a> / <a target="_blank" href="https://benjamingeets.be">Benjamin Geets</a> / <a target="_blank" href="https://www.linkedin.com/in/galandtristan/">Tristan Galand</a> / <a target="_blank" href="https://www.linkedin.com/in/ugoporcu/">Ugo Porcu</a> - Fan2Bourgy</small>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";
@keyframes zoom {
  0% {transform: scale(1);}
  50% {transform: scale(1.2);}
  100% {transform: scale(1);}
}

.home{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img{
    
        animation-name: zoom;
       animation-duration: 4s;
       animation-iteration-count: infinite;
  }
  button{
    width: 200px;
    height: 100px;
  }
  *{
    padding: 20px 0;
  }
  input{
    width: 50%;
  }
}
</style>*