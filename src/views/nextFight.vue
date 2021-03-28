<template>
    <div class="wp">
       
    </div>
</template>

<script>
export default {
  mounted(pif){
    pif = Math.floor(Math.random()*10)
    if(pif<50) {
      this.$router.push({ path: "/fight/slime" });
    }
    if(50>=pif<95) {
      this.$router.push({ path: "/fight/serpent" });
    }
    if(pif>=95 && this.$store.state.player.lvl>9) {
      this.$router.push({ path: "/fight/boss" });
    }
    else{
      this.$router.push({ path: "/fight/slime" });
    }
  }
}
</script>