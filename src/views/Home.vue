<template>
  <div class="home">
    <img src="/favicon.svg" alt="">
    <h1>Bertrand's Quest</h1>
    <p>Enter player name :</p>
    <input class="nes-input" type="text" v-model='$store.state.player.name'>
    <router-link to="/select-weapon"><button class="nes-btn">Start new game</button></router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods:{

  }
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