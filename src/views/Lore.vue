<template>
  <div class="lore"> 
      <h1>Welcome to Bertrand's Quest</h1>
      <p>
        After a long travel from the Earth, our valiant Betrand land on the Red
        Planet. As a good space conquistador, he have to kill all the little
        green men. Let's try to help him.
      </p>
      <router-link to="/nextFight">
        <button class="nes-btn">
          Start your journey
        </button>
      </router-link>
  </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
.lore {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
