<template>
  <div>
    <div class="select-weapon">
      <div class="imgSelect">
          <img src="/assets/images/player.svg" alt="">
      </div>
      <h3>{{ $store.state.player.name }}, choose your weapon :</h3>
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
          <span>Assault weapon</span>
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
          <span>Riffle</span>
        </label>
      </div>
      <router-link to="/lore">
        <button class="nes-btn">
          Next
        </button>
      </router-link>
    </div>
    <div class="select-game-mode">
      <h3>Game mode :</h3>
      <div>
        <label>
          <input
            type="checkbox"
            class="nes-checkbox"
            name="answer"
            v-model="$store.state.infinite"
          />
          <span>Infinite</span> <br> <br>
          <p>If not selected, game will stop at first boss.</p>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if(this.$store.state.player.name == "BertrandBg"){
      this.$store.commit("godMode", this.goldEarned);
    }
  },
};
</script>

<style lang="scss" scoped>
.select-weapon {
  margin: auto;
  width: 550px;
  padding-top: 50px;
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
.select-game-mode {
  margin: auto;
  width: 550px;
  padding-top: 30px;
}
</style>
