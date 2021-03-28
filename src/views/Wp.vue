<template>
    <div class="wp">
        <h1>What a big dick, ur really a boss</h1>
        <p>{{$store.state.player.bag.gold}}</p>
        <p>{{$store.state.player.stats.xp}}</p>
        <p>{{$store.state.player.stats.lvl}}</p>


      <router-link to="/shop"><button>Shop</button></router-link>
    </div>
</template>