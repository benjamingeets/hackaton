<template>
  <div class="fight">
    <div class="display nes-container">
      <div class="myself">
        <progress
          :class="'nes-progress ' + hpColorClass.player"
          :max="player.hpMax"
          :value="player.hp"
        ></progress>
        <p>{{ player.hp }} / {{ player.hpMax }} <img style="height:20px;width:20px;animation:none" src="/assets/images/heart.svg" alt=""></p>
        <img id="player-image" :src="playerPath" alt="" />
        <div class="stats">
          <h2>{{ player.name }} Lv.{{ player.lvl }}</h2>
          <p>{{ player.attack }} <img style="height:16px;width:16px;animation:none" src="/assets/images/weapon.svg" alt=""></p>
          <p>
            {{ player.armor }} <img style="height:16px;width:16px;animation:none" src="/assets/images/armor.svg" alt="">
            <span v-if="player.preventDamages">(shield)</span>
          </p>
        </div>
      </div>
      <div class="enemy">
        <progress
          :class="'nes-progress ' + hpColorClass.enemy"
          :max="mob.hpMax"
          :value="mob.hp"
        ></progress>
        <p><img style="height:20px;width:20px;animation:none" src="/assets/images/heart.svg" alt=""> {{ mob.hp }} / {{ mob.hpMax }} </p>
        <img
          id="enemy-image"
          :src="enemyPath"
          alt=""
        />
        <div class="stats">
          <h2>{{ mob.name }}</h2>

          <p><img style="height:16px;width:16px;animation:none" src="/assets/images/weapon.svg" alt=""> {{ mob.attack }}</p>
          <p>
            <span v-if="mob.preventDamages">(shield)</span> <img style="height:16px;width:16px;animation:none" src="/assets/images/armor.svg" alt="">
            {{ mob.armor }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="!wait && !fightEnd" class="choices">
      <button class="nes-btn" @click="attack()">Attack</button>
      <button class="nes-btn" @click="defend()">Defend</button>
      <button class="nes-btn" @click="heal()">Heal</button>
      <button class="nes-btn" @click="displayInventory = !displayInventory">
        Inventory
      </button>
    </div>
    <div v-if="wait" class="choices">
      <button class="nes-btn is-disabled">Attack</button>
      <button class="nes-btn is-disabled">Defend</button>
      <button class="nes-btn is-disabled">Heal</button>
      <button class="nes-btn is-disabled">Inventory</button>
    </div>
    <div v-if="displayInventory && !fightEnd" class="nes-container with-title">
      <p class="title">Inventory</p>
      <p>Weapon: {{ player.weapon.name }} ({{ totalDamages }})</p>
      <p>{{ this.$store.state.player.bag.potionsQuantity }} Medikit(s)</p>
      <p>Money : {{ $store.state.player.bag.gold }}g</p>
      <p>Weapon lvl : {{ this.$store.state.player.weaponLvl }}</p>
    </div>
    <div class="history nes-container with-title">
      <p class="title">Fight</p>
      <p>{{ lastAction }}</p>
      <div v-if="fightEnd">
        <p>You won and earned : XP + {{ this.goldEarned }}g</p>
        <div class="go-shop">
          <router-link to="/shop">
            <button class="nes-btn">Go to shop</button>
          </router-link>
          <router-link v-if="$route.params.mob != 'boss' " to="/nextFight">
            <button class="nes-btn">Next fight</button>
          </router-link>
          <router-link v-else to="/wp">
            <button class="nes-btn">Next</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mobs from "@/assets/mobs.json";
import items from "@/assets/items.json";

export default {
  data() {
    return {
      playerPath: "/assets/images/player.svg",
      totalDamages: "0",
      lastAction: "Fight begin",
      enemyPath: '/assets/images/' + this.$route.params.mob + '.svg',
      fightEnd: false,
      hpColorClass: {
        player: "is-success",
        enemy: "is-success",
      },
      goldEarned: 0,
      displayInventory: false,
      mob: {
        id: 0,
        name: "...",
        hpMax: 10,
        hp: 10,
        attack: 10,
        armor: 10,
        xpLoot: 100,
        preventDamages: false,
      },
      player: {
        name: this.$store.state.player.name,
        hpMax: this.$store.state.player.stats.hpMax,
        hp: 10,
        attack: this.$store.state.player.stats.attack,
        armor: this.$store.state.player.stats.armor,
        preventDamages: false,
        weapon: {
          id: this.$store.state.player.bag.weaponId,
          name: "Baton",
          damages: 0,
        },
        weaponLvl: 1,
        lvl: this.$store.state.player.lvl,
        xp: this.$store.state.player.xp,
        xpMax: this.$store.state.player.xpMax,
      },
      wait: false,
    };
  },
  methods: {
    //Fonctions des boutons
    attack() {
      if (this.mob.hp < this.mob.hpMax*0.5) {
        this.hpColorClass.enemy = "is-warning";
      }
      this.playerPath = "/assets/images/player_attack.svg";
      let damages =
        this.player.attack -
        this.mob.armor +
        this.totalDamages
      if (damages > 0) {
        if (this.mob.preventDamages) {
          //Si *défend*
          this.mob.hp = this.mob.hp - damages / 2;
          this.mob.preventDamages = false;
        } else {
          this.mob.hp = this.mob.hp - damages;
        }
        this.lastAction =
          this.player.name +
          " hits " +
          this.mob.name +
          " and does " +
          damages +
          " damages";
      } else {
        this.lastAction = this.player.name + " didn't make any damage";
      }
      if (this.mob.hp < this.mob.hpMax*0.5) {
        this.hpColorClass.enemy = "is-warning";
      }
      this.mobTurn();
    },
    defend() {
      this.player.preventDamages = true;
      this.lastAction = "You defend yourself";
      this.playerPath = "/assets/images/player_def.svg";
      this.mobTurn();
    },
    heal() {
      if (this.$store.state.player.bag.potionsQuantity > 0) {
        if (this.player.hp < this.player.hpMax) {
          this.player.hp = Math.floor(
            this.player.hp +
              (items.Healing.Potion.Effect * this.player.hpMax) / 100
          );
          this.playerPath = "/assets/images/player_heal.svg";
          if (this.player.hp > this.player.hpMax) {
            this.player.hp = this.player.hpMax;
            this.playerPath = "/assets/images/player_heal.svg";
          }
          this.$store.commit("usePotion");
          this.mobTurn();
        } else {
          this.lastAction = "You're already full HP";
        }
      } else {
        this.lastAction = "No more potions in your inventory";
      }
    },
    //Lance le tour du mob
    mobTurn() {
      if (this.mob.hp > 0) {
        this.preventAction(); //Bloque les boutons pour empecher de spam
        setTimeout(() => {
          let damages = this.mob.attack - this.player.armor;
          //Défini un timer pour laisser durer un peu
          const luck = Math.round(Math.random() * 100);
          if (luck > 20 && damages > 0) {
            if (this.player.preventDamages) {
              //Si *défend*
              this.player.hp = this.player.hp - damages / 2;
              this.player.preventDamages = false;
            } else {
              this.player.hp = this.player.hp - damages;
            }
            this.lastAction =
              "Monster attacks and inflicts " + damages + " damages";
          } else {
            this.mob.preventDamages = true;
            this.lastAction = "Monster prepare to protect himself";
          }
          this.wait = false;
          this.playerPath = "/assets/images/player.svg";
          if (this.player.hp < this.$store.state.player.stats.hpMax*0.5) {
            this.hpColorClass.player = "is-warning";
          }
          this.checkIfDead();
        }, 1250);
      } else {
        this.checkIfDead();
      }
    },
    preventAction() {
      this.wait = true;
    },
    //Fonction pour la mort du personnage
    checkIfDead() {
      if (this.player.hp <= 0) {
        //Si le combat est perdu
        this.player.hp = 0;
        this.$router.push({ path: "/dead" });
      } else if (this.mob.hp <= 0) {
        //Si le combat est gagné
        this.enemyPath = "/assets/images/" + this.$route.params.mob +  "_dead.svg"
        this.mob.hp = 0;
        this.earnGold();
        this.earnXP();
        this.playerPath = "/assets/images/player_win.svg"
        if(this.$route.params.mob === "boss" && this.$store.state.infinite){
          this.$router.push({ path: "/dead" });
        }
        this.fightEnd = true;
      }
    },
    earnGold() {
      this.goldEarned =
        mobs[this.mob.id].goldLoot +
        2 * this.player.lvl +
        Math.round(Math.random() * (this.player.lvl * 1, 2));
      this.$store.commit("earnGold", this.goldEarned);
    },
    earnXP() {
      this.$store.commit(
        "earnExp",
        mobs[this.mob.id].xpLoot +
          this.player.lvl +
          Math.round(Math.random() * (this.player.lvl / 2))
      );
      this.checkIfLvlUp();
    },
    checkIfLvlUp() {
      if (this.player.xp >= this.player.xpMax) {
        this.$store.commit("lvlUp");
      }
    },
    //Fonction pour set les stats du mob au beforeMount()
    setMobStats() {
      switch (this.$route.params.mob) {
        case "blue":
          this.id = 0;
          break;
        case "red":
          this.id = 1;
          break;
        case "boss":
          this.id = 2;
          break;
        default:
          alert("mdr ça existe pas gros");
          break;
      }
      this.mob.name = mobs[this.id].name;
      this.mob.hpMax = mobs[this.id].hpMax + 5 * this.player.lvl;
      this.mob.attack = mobs[this.id].attack + 4 * this.player.lvl;
      this.mob.armor = mobs[this.id].armor + 4 * this.player.lvl;
      this.mob.xpLoot = mobs[this.id].xpLoot;

      this.mob.hp = this.mob.hpMax;
    },
    setWeapon() {
      this.player.weapon.name = items.Weapons[this.player.weapon.id].name;
      this.player.weapon.damages = items.Weapons[this.player.weapon.id].dmg;
      this.totalDamages = Math.floor(this.player.weapon.damages + items.Weapons[this.player.weapon.id].dmgBonus * this.player.weaponLvl)
    },
  },
  beforeMount() {
    this.setMobStats();
    this.setWeapon();
    this.player.hp = this.player.hpMax;
  },
};
</script>

<style lang="scss" scoped>
@keyframes personnage {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(-5px);
  }
}

/* The element to apply the animation to */

.fight {
  height: 100%;
  .display {
    background-image: url("/assets/images/background.png");
    background-size: cover;
    display: flex;
    padding: 15px 10px 0 10px;
    .enemy,
    .myself {
      width: 50%;
      display: flex;
      flex-direction: column;

      img {
        text-align: left;
        height: 250px;
        width:250px;
        animation-name: personnage;
        animation-duration: 4s;
        animation-iteration-count: infinite;
      }
      progress {
        width: 50%;
      }
    }
    .enemy {
      align-items: flex-end;
      p {
        text-align: right;
      }
      .stats {
        h2 {
          text-align: right;
        }
      }
    }
  }
  .choices {
    margin: 50px 0;
    display: flex;
    justify-content: space-evenly;
    button {
      width: 20%;
    }
  }
  .history {
    margin-top: 50px;
  }
}

.go-shop {
  display: flex;
  justify-content: center;
  button {
    margin: 10px;
  }
}
@media (max-width: 600px) {
  .fight {
    .choices {
      flex-direction: column;
      align-items: center;
      button {
        width: 80%;
        margin-top: 20px;
      }
    }
  }
}
</style>
