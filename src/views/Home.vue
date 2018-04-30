<template lang="pug">
  .container
    .row
      .col
        select.form-control
          option(v-for="note in notes") {{note}}
      .col
        select.form-control
          option(v-for="scale in scales") {{scale}}
    hr
    .text-center.mb-3
    .row(v-for="i in tuning")
      .col.p-0.border(v-for="note in guitar.notes.slice(i, 24 + i - 1)" @click="start(note.name, note.octave)")
        .text-lowercase.text-center {{note.name + note.octave}}
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
      scales: [],
      tuning: {
        1: 24,
        2: 19,
        3: 15,
        4: 10,
        5: 5,
        6: 0
      },
      guitar: {
        notes: [
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
      }
    };
  },
  methods: {
    getScaleNotes(note, tonic) {
      return axios
        .get("http://localhost:8080/scale/notes", {
          params: {
            note,
            tonic
          }
        })
        .then(res => res.data);
    },
    getScaleNames() {
      return axios
        .get("http://localhost:8080/scale/names")
        .then(res => res.data);
    },
    getNoteFreq(note, oct) {
      return axios
        .get("http://localhost:8080/note/freq", {
          params: {
            note,
            oct
          }
        })
        .then(res => res.data);
    },
    start(name, octave) {
      let ctx = new AudioContext();
      let osc = ctx.createOscillator();
      this.getNoteFreq(name, octave).then(res => {
        osc.frequency.value = res;
        osc.start();
        osc.connect(ctx.destination);
        osc.stop(ctx.currentTime + 0.2);
      });
    }
  },
  created() {
    // this.getScaleNotes("C", "major").then(res => {
    //   this.notes = res;
    // });
    this.getScaleNames().then(res => {
      this.scales = res;
    });
  }
};
</script>
