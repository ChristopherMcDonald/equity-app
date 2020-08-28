<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col no-gutters>
        <v-row no-gutters>
          <v-btn
            class="pad-right pad-bottom"
            v-for="(player, i) in players"
            v-bind:key="i"
            :color="isPrimary(i)"
            @click="selectPlayer(i)"
          >{{ player.name }}</v-btn>
          <v-btn v-if="players.length < 9" color="success" @click="addPlayer">+</v-btn>
        </v-row>
        <v-row no-gutters class="left-item">
          <v-text-field v-model="players[selected].name" label="Player's Name"></v-text-field>
          <v-row v-for="(row, j) in allHands()" v-bind:key="j" no-gutters>
            <v-col class="button" v-for="col in row" v-bind:key="col">
              <v-btn
                small
                :color="isSelected(selected, col)"
                v-on:click="() => toggleHand(selected, col)"
              >{{ col }}</v-btn>
            </v-col>
          </v-row>
          <v-row class="full-width left-item">
            <v-btn
              class="warning pad-right"
              :disabled="players.length === 1"
              @click="deletePlayer"
            >Delete Player</v-btn>
            <v-btn class="error" @click="clearRange">Clear Range</v-btn>
          </v-row>
          <v-row class="left-item">
            <v-subheader class="pl-0">Range (%)</v-subheader>
            <v-slider
              v-model="players[selected].rangePercentage"
              thumb-label
            ></v-slider>
          </v-row>
        </v-row>
      </v-col>
      <v-col class="calc">
        <h3>Range Calculator</h3>
        <div v-for="(player, i) in players" v-bind:key="i">
          <h3>{{player.name}}</h3>
          <v-progress-linear v-model="player.winRate" :color="getColor(player.winRate)" height="25">
            <template v-slot="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
          <br />
        </div>
        <br />
        <v-btn
          color="primary"
          @click="getEquity"
          :disabled="players.some((player) => player.range.length === 0)"
        >Calculate Equity</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { CardGroup, OddsCalculator } from 'poker-odds-calculator';
import handMixin from '../utils/hands';

@Component({
  mixins: [handMixin],
})
export default class Main extends Vue {
  players: { name: string; range: string[]; winRate: number; rangePercentage: number }[] = [
    {
      name: 'Chris',
      range: ['AA', 'KK'],
      winRate: 0.0,
      rangePercentage: 1.0,
    },
    {
      name: 'Cameron',
      range: ['AA', 'KK', 'AKo', 'AKs'],
      winRate: 0.0,
      rangePercentage: 2.0,
    },
    {
      name: 'Forest',
      range: ['AA', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'AKs', 'KK', 'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'AQs', 'KQs', 'QQ', 'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'AJs', 'KJs', 'QJs', 'JJ', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'ATs', 'KTs', 'QTs', 'JTs', 'TT', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', 'A9s', 'K9s', 'Q9s', 'J9s', 'T9s', '99', '98o', '97o', '96o', '95o', '94o', '93o', '92o', 'A8s', 'K8s', 'Q8s', 'J8s', 'T8s', '98s', '88', '87o', '86o', '85o', '84o', '83o', '82o', 'A7s', 'K7s', 'Q7s', 'J7s', 'T7s', '97s', '87s', '77', '76o', '75o', '74o', '73o', '72o', 'A6s', 'K6s', 'Q6s', 'J6s', 'T6s', '96s', '86s', '76s', '66', '65o', '64o', '63o', '62o', 'A5s', 'K5s', 'Q5s', 'J5s', 'T5s', '95s', '85s', '75s', '65s', '55', '54o', '53o', '52o', 'A4s', 'K4s', 'Q4s', 'J4s', 'T4s', '94s', '84s', '74s', '64s', '54s', '44', '43o', '42o', 'A3s', 'K3s', 'Q3s', 'J3s', 'T3s', '93s', '83s', '73s', '63s', '53s', '43s', '33', '32o', 'A2s', 'K2s', 'Q2s', 'J2s', 'T2s', '92s', '82s', '72s', '62s', '52s', '42s', '32s', '22'],
      winRate: 0.0,
      rangePercentage: 100.0,
    },
  ];

  selected = 0;

  mounted() {
    this.getEquity();
  }

  @Watch('selectedRange')
  onSelectedRangeChange(a: number) {
    this.players[this.selected].range = (
      handMixin
        .allHandsRanked
        .slice(0, Math.ceil((handMixin.allHandsRanked.length - 1) * (a / 100)))
    );
  }

  get selectedRange() {
    return this.players[this.selected].rangePercentage;
  }

  getColor(percent: number) {
    const all = this.players.map((a) => a.winRate);
    if (Math.max(...all) === percent) {
      return 'green';
    }
    if (Math.min(...all) === percent) {
      return 'red';
    }

    return 'blue';
  }

  addPlayer() {
    this.players.push({
      name: `Player ${this.players.length + 1}`,
      range: [],
      winRate: 0.0,
      rangePercentage: 0.0,
    });
  }

  isPrimary(i: number) {
    if (this.selected === i) {
      return 'primary';
    }
    return 'normal';
  }

  selectPlayer(i: number) {
    this.selected = i;
  }

  isSelected(i: number, hand: string) {
    return this.players[i].range.includes(hand) ? 'primary' : 'normal';
  }

  toggleHand(i: number, hand: string) {
    if (this.players[i].range.includes(hand)) {
      this.players[i].range = this.players[i].range.filter((r) => r !== hand);
    } else {
      this.players[i].range.push(hand);
    }

    this.getEquity();
  }

  deletePlayer() {
    this.players.splice(this.selected, 1);
    this.selected = 0;
    this.getEquity();
  }

  clearRange() {
    this.players[this.selected].range = [];
  }

  getEquity() {
    const holdings = this.players.map<{
      name: string;
      range: string[];
      equities: number[];
    }>((player) => ({
      name: player.name,
      range: handMixin.methods.transformRange(player.range),
      equities: [],
    }));

    for (let games = 0; games < 100; games += 1) {
      const takenHands: string[] = [];
      const takenCards: string[] = [];
      holdings.forEach((holding) => {
        const acceptableHands = holding.range.filter(
          (h) => ![h.substring(0, 2), h.substring(2, 4)].some((j) => takenCards.includes(j)),
        );

        const randomHand = acceptableHands[Math.floor(Math.random() * acceptableHands.length)];
        takenHands.push(randomHand);
        takenCards.push(
          ...[randomHand.substring(0, 2), randomHand.substring(2, 4)],
        );
      });

      OddsCalculator.calculate(
        takenHands.map((a) => CardGroup.fromString(a)),
        undefined,
        undefined,
        100,
      ).equities.forEach((equity, i) => {
        holdings[i].equities.push(
          equity.getEquity() + equity.getTiePercentage(),
        );
      });
    }

    holdings.forEach((holding, i) => {
      this.players[i].winRate = (
        holding.equities.reduce((a, b) => a + b, 0) / holding.equities.length
      );
    });
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin: 5px 1px;
}

.left-item {
  margin: 3% 0;
}

.pad-right {
  margin: 0 3% 0 0;
}

.pad-bottom {
  margin: 0 3% 3% 0;
}

.calc {
  margin: 1%;
}

.full-width {
  width: 100%;
}
</style>
