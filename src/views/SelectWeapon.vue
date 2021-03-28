<template>
  <div>
    <div class="select-weapon">
      <div class="imgSelect">
        <img src="/assets/images/player.svg" alt="" />
      </div>
      <p>{{ $store.state.player.name }}, choose your weapon :</p>
      <div>
        <label>
          <input
            type="radio"
            class="nes-radio"
            name="answer"
            value="0"
            v-model="$store.state.player.bag.weaponId"
            checked
          />
          <span>Assault (10 dmg, +1,5 by lvl)</span>
        </label>
        <br />
        <label>
          <input
            type="radio"
            class="nes-radio"
            name="answer"
            value="1"
            v-model="$store.state.player.bag.weaponId"
          />
          <span>Riffle (15 dmg, +1 by lvl)</span>
        </label>
      </div>
      <router-link to="/lore">
        <button class="nes-btn">
          Next
        </button>
      </router-link>
      <p>Game mode :</p>
      <label>
        <input
          type="checkbox"
          class="nes-checkbox"
          name="answer"
          v-model="$store.state.infinite"
        />
        <span>Infinite</span>
        
      </label>
      <p v-if="$store.state.infinite">
          The game will not stop at first boss.
        </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.player.name == "BertrandBg") {
      this.$store.commit("godMode", this.goldEarned);
    }
  },
  beforeMount() {
    if (this.$store.state.player.name == "") {
      //Si le nom est vide, on met bertrand
      this.$store.commit("nameError");
    }
  }
};
</script>

<style lang="scss" scoped>
.select-weapon {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 550px;
  padding-top: 50px;
  button{
    margin:50px 0;
  }
  .imgSelect {
    img {
      width: 35%;
      margin-bottom: 40px;
      text-align: center;
      display: flex;
      margin: auto;
      padding-bottom: 50px;
    }
  }
}
</style>
