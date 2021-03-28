<template>
    <div class="wp">
       
    </div>
</template>

<script>
export default {
  mounted(){
    let pif = Math.floor(Math.random() * (100 - 1) + 1);
    
    if(this.$store.state.player.name == "BertrandBg") {
      console.log("bogoss")
      this.$router.push({ path: "/fight/boss" });
    }
    else if(pif<50) {
      this.$router.push({ path: "/fight/blue" });
    }
    else if(50>=pif && pif < 95) {
      this.$router.push({ path: "/fight/red" });
    }
    else if(pif>=95 && this.$store.state.player.lvl>9) {
      this.$router.push({ path: "/fight/boss" });
    }
    else{
      this.$router.push({ path: "/fight/red" });
    }
  }
}
</script>