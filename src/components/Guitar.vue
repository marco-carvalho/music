<template lang="pug">
  .mb-3
    .row(v-for="i in tuning")
      .col.p-0.border(v-for="note in guitar.notes.slice(i, 24 + i - 1)" @click="start(note.frequency)")
        .text-lowercase.text-center(:class="{'table-success':scaleNotes.includes(note.name)}")
          span {{note.name + note.octave}}
</template>

<script>
import axios from "axios";

export default {
  props: ["scaleNotes"],
  data() {
    return {
      tuning: {
        1: 28,
        2: 24,
        3: 19,
        4: 14,
        5: 9,
        6: 4
      },
      guitar: {
        notes: [
          { name: "C", octave: 2 },
          { name: "Db", octave: 2 },
          { name: "D", octave: 2 },
          { name: "Eb", octave: 2 },
          { name: "E", octave: 2 },
          { name: "F", octave: 2 },
          { name: "Gb", octave: 2 },
          { name: "G", octave: 2 },
          { name: "Ab", octave: 2 },
          { name: "A", octave: 2 },
          { name: "Bb", octave: 2 },
          { name: "B", octave: 2 },
          { name: "C", octave: 3 },
          { name: "Db", octave: 3 },
          { name: "D", octave: 3 },
          { name: "Eb", octave: 3 },
          { name: "E", octave: 3 },
          { name: "F", octave: 3 },
          { name: "Gb", octave: 3 },
          { name: "G", octave: 3 },
          { name: "Ab", octave: 3 },
          { name: "A", octave: 3 },
          { name: "Bb", octave: 3 },
          { name: "B", octave: 3 },
          { name: "C", octave: 4 },
          { name: "Db", octave: 4 },
          { name: "D", octave: 4 },
          { name: "Eb", octave: 4 },
          { name: "E", octave: 4 },
          { name: "F", octave: 4 },
          { name: "Gb", octave: 4 },
          { name: "G", octave: 4 },
          { name: "Ab", octave: 4 },
          { name: "A", octave: 4 },
          { name: "Bb", octave: 4 },
          { name: "B", octave: 4 },
          { name: "C", octave: 5 },
          { name: "Db", octave: 5 },
          { name: "D", octave: 5 },
          { name: "Eb", octave: 5 },
          { name: "E", octave: 5 },
          { name: "F", octave: 5 },
          { name: "Gb", octave: 5 },
          { name: "G", octave: 5 },
          { name: "Ab", octave: 5 },
          { name: "A", octave: 5 },
          { name: "Bb", octave: 5 },
          { name: "B", octave: 5 },
          { name: "C", octave: 6 },
          { name: "Db", octave: 6 },
          { name: "D", octave: 6 }
        ]
      },
    }
  },
  methods: {
    getNoteFreq(note, oct) {
      return axios
        .get("https://scalemusicapi.herokuapp.com/note/freq", {
          params: {
            note,
            oct
          }
        })
        .then(res => res.data);
    },
    start(frequency) {
      let ctx = new AudioContext();
      let osc = ctx.createOscillator();
      osc.frequency.value = frequency;
      osc.start();
      osc.connect(ctx.destination);
      osc.stop(ctx.currentTime + 0.2);
    }
  },
  mounted() {
    this.guitar.notes.forEach(note => {
      this.getNoteFreq(note.name, note.octave).then(res => {
        note.frequency = res;
      })
    });
  }
};
</script>