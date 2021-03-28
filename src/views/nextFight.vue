<template>
    <div class="wp">
       
    </div>
</template>

<script>
export default {
  mounted(){
    const pif = Math.random() * (100 - 1) + 1;
    console.log(pif)
    if(pif<50) {
      this.$router.push({ path: "/fight/blue" });
    }
    if(50>=pif && pif < 95) {
      this.$router.push({ path: "/fight/red" });
    }
    if(pif>=95 && this.$store.state.player.lvl>9) {
      this.$router.push({ path: "/fight/boss" });
    }
    else{
      this.$router.push({ path: "/fight/red" });
    }
  }
}
</script>