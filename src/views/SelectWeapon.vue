<template>
  <div>
    <p>{{ $store.state.player.name }}, choisi ton arme :</p>
    <div>
      <label>
        <input type="radio" class="nes-radio" name="answer" value="0" v-model="$store.state.player.bag.weaponId" checked />
        <span>Fusil</span>
      </label>

      <label>
        <input type="radio" class="nes-radio" name="answer" value="1" v-model="$store.state.player.bag.weaponId"/>
        <span>Poing</span>
      </label>
    </div>
    <router-link to="/fight/slime"><button class="nes-btn">Valider</button></router-link>
  </div>
</template>

<script>
export default {
  methods: {
    SelectWeapon(choice) {
      switch (choice) {
        case 1:
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
