<template>
  <div class="shop">
    <h1>THE SHOP</h1>

    <h2>Welcome, {{ $store.state.player.name }}</h2>

    <p>You've got {{ this.$store.state.player.bag.gold }} 🪙</p>

    <div class="stock">
      <div class="weapon">
        <p>Weapon level</p>
        <img src="https://via.placeholder.com/150x100" alt="">
        <button class="nes-btn" @click="buy(1)">Buy {{prices.weapon}}</button>
      </div>
      <div class="stat">
        <p>+5 {{statToSell}}</p>
        <img src="https://via.placeholder.com/150x100" alt="">
        <button class="nes-btn" v-if="!flagStat" @click="buy(2)">Buy for {{prices.stat}}</button>
      </div>
      <div class="potion">
        <p> {{nbrPotions}} Potions</p>
        <img src="https://via.placeholder.com/150x100" alt="">
        <button class="nes-btn" @click="buy(3)">Buy for {{prices.potions}}</button>
      </div>
    </div>
    
    <div class="back">
        <router-link to="/fight/slime">
        <button class="nes-btn">Let's fight</button>
        </router-link>
    </div>
    <div class="nes-container with-title">
      <div class="title">Inventory</div>
      <p>Weapon lvl : {{$store.state.player.weaponLvl}}</p>
      <p>{{$store.state.player.bag.potionsQuantity}} potions</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nes-container{
  margin-top:50px;
}
.shop {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    border: 8px solid black;
    margin: 20px;
  }
  .stock {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        margin:0;
      }
      img{
        margin:20px 0;
      }
    }
  }
  .back {
    margin-top: 50px;
  }
}
</style>

<script>
import items from "@/assets/items.json";

export default {
  data() {
    return {
        golds: this.$store.state.player.bag.gold,
        nbrPotions:0,
        weaponPrice:0,
        statToSell:"",
        flagStat:false,
        prices:{
          weapon:0,
          stat:0,
          potions:0
        }
    };
  },
  methods:{
    genPotionsNmbr(min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      this.nbrPotions = Math.floor(Math.random() * (max - min +1)) + min;
    },
    buy(params){
      switch (params) {
        case 1:

          break;
        case 2:
          
          if(this.prices.stat <= this.$store.state.player.bag.gold){
            this.$store.commit('upgradeStat', this.statToSell)
            this.$store.commit('spendGold',this.prices.stat)
            this.flagStat = true
          }
          else{
            this.lastAction = "Pas assez d'argent"
          }
          break;
        case 3:
          if(this.prices.potions<= this.$store.state.player.bag.gold){
            this.$store.commit("buyPotions", this.nbrPotions)
            this.$store.commit('spendGold',this.prices.potions)
          }
          else{
            this.lastAction = "Pas assez d'argent"
          }
          break;
        default:
          break;
      }
      
    },
    setPrices(){
      this.prices.weapon =  50*this.$store.state.player.weaponLvl
      this.prices.stat =  25*this.$store.state.player.stats.statsLvl
      this.prices.potions =  items.Healing.Potion.Price * this.nbrPotions
    },
    getRandomStat (min, max){
      min = Math.ceil(min);
      max = Math.floor(max);
      const luck = Math.floor(Math.random() * (max - min +1)) + min;
      switch (luck) {
        case 1:
          this.statToSell = "Armor"
          break;
        case 2:
          this.statToSell = "Attack"
          break;
        case 3:
          this.statToSell = "hpMax"
          break;
        default:
          break;
      }
    }
  },
  beforeMount(){
    this.genPotionsNmbr(1,5)
    this.getRandomStat(1,3)
    this.setPrices()
    }

};
</script>