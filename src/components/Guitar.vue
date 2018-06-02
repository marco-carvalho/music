<template lang="pug">
  div
    .row(v-for="i in tuning")
      .col.p-0.border(v-for="note in guitar.notes.slice(i, 12 + i)" @click="start(note.frequency)")
        .text-center(:class="'bg-' + noteColor.find(x => x.note === note.name).color")
          .font-weight-bold.text-white.text-shadow {{note.name + note.octave}}
</template>

<script>
import axios from "axios";

export default {
  props: ["noteColor"],
  data() {
    return {
      ctx: null,
      tuning: {
        1: 28,
        2: 23,
        3: 19,
        4: 14,
        5: 9,
        6: 4
      },
      guitar: {
        notes: [
          { name: "C", octave: 2 },
          { name: "C#", octave: 2 },
          { name: "D", octave: 2 },
          { name: "D#", octave: 2 },
          { name: "E", octave: 2 },
          { name: "F", octave: 2 },
          { name: "F#", octave: 2 },
          { name: "G", octave: 2 },
          { name: "G#", octave: 2 },
          { name: "A", octave: 2 },
          { name: "A#", octave: 2 },
          { name: "B", octave: 2 },
          { name: "C", octave: 3 },
          { name: "C#", octave: 3 },
          { name: "D", octave: 3 },
          { name: "D#", octave: 3 },
          { name: "E", octave: 3 },
          { name: "F", octave: 3 },
          { name: "F#", octave: 3 },
          { name: "G", octave: 3 },
          { name: "G#", octave: 3 },
          { name: "A", octave: 3 },
          { name: "A#", octave: 3 },
          { name: "B", octave: 3 },
          { name: "C", octave: 4 },
          { name: "C#", octave: 4 },
          { name: "D", octave: 4 },
          { name: "D#", octave: 4 },
          { name: "E", octave: 4 },
          { name: "F", octave: 4 },
          { name: "F#", octave: 4 },
          { name: "G", octave: 4 },
          { name: "G#", octave: 4 },
          { name: "A", octave: 4 },
          { name: "A#", octave: 4 },
          { name: "B", octave: 4 },
          { name: "C", octave: 5 },
          { name: "C#", octave: 5 },
          { name: "D", octave: 5 },
          { name: "D#", octave: 5 },
          { name: "E", octave: 5 },
          { name: "F", octave: 5 },
          { name: "F#", octave: 5 },
          { name: "G", octave: 5 },
          { name: "G#", octave: 5 },
          { name: "A", octave: 5 },
          { name: "A#", octave: 5 },
          { name: "B", octave: 5 },
          { name: "C", octave: 6 },
          { name: "C#", octave: 6 },
          { name: "D", octave: 6 }
        ]
      }
    };
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
      this.ctx.resume();
      let osc = this.ctx.createOscillator();
      osc.frequency.value = frequency;
      osc.start();
      osc.connect(this.ctx.destination);
      osc.stop(this.ctx.currentTime + 0.2);
    }
  },
  mounted() {
    this.guitar.notes.forEach(note => {
      this.getNoteFreq(note.name, note.octave).then(res => {
        note.frequency = res;
      });
    });
    this.ctx = new AudioContext();
  }
};
</script>
