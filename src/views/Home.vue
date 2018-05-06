<template lang="pug">
  .container
    .row
      .col
        strong Note:
        select.form-control(v-model="note" @change="setScaleNotes()")
          option(v-for="note in notes") {{note}}
      .col
        strong Scale:
        select.form-control(v-model="scale" @change="setScaleNotes(); setScaleChords();")
          option(v-for="scale in scales") {{scale}}
    hr
    Guitar(:scaleNotes="scaleNotes" :chordNotes="chordNotes")
    hr
    h2 Select a chord
    .row
      .col
        strong Scale Note:
        select.form-control(v-model="scaleNote")
          option(v-for="scaleNote in scaleNotes") {{scaleNote}}
      .col
        strong Scale Chord:
        select.form-control(v-model="scaleChord")
          option(v-for="scaleChord in scaleChords") {{scaleChord}}
    //- pre {{$data}}
</template>

<script>
import axios from "axios";
import Guitar from "@/components/Guitar";

export default {
  data() {
    return {
      note: "C",
      notes: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
      scale: null,
      scales: [],
      scaleNote: null,
      scaleNotes: [],
      scaleChord: null,
      scaleChords: [],
      chordNotes: []
    };
  },
  components: {
    Guitar
  },
  methods: {
    getScaleNotes(note, tonic) {
      return axios
        .get("https://scalemusicapi.herokuapp.com/scale/notes", {
          params: {
            note,
            tonic
          }
        })
        .then(res => {
          return res.data
        });
    },
    getScaleNames() {
      return axios
        .get("https://scalemusicapi.herokuapp.com/scale/names")
        .then(res => {
          return res.data
        });
    },
    getScaleChords(scale) {
      return axios
        .get("https://scalemusicapi.herokuapp.com/scale/chords", {
          params: {
            scale
          }
        })
        .then(res => {
          return res.data
        });
    },
    getChordNotes(chord) {
      return axios
        .get("https://scalemusicapi.herokuapp.com/chord/notes", {
          params: {
            chord
          }
        })
        .then(res => {
          return res.data
        });
    },
    setScales() {
      this.getScaleNames().then(res => {
        this.scales = res;
        this.scale = this.scales[0];
        this.setScaleNotes();
        this.setScaleChords();
      });
    },
    setScaleNotes() {
      this.getScaleNotes(this.note, this.scale).then(res => {
        this.scaleNotes = res;
        this.scaleNote = this.scaleNotes[0];
      });
    },
    setScaleChords() {
      this.getScaleChords(this.scale).then(res => {
        this.scaleChords = res;
        this.scaleChord = this.scaleChords[0];
      });
    }
  },
  mounted() {
    this.setScales();
    // this.scaleChords.forEach(element => {
    //   this.getChordNotes(this.element).then(res => {
    //     this.element.notes = res;
    //   });
    // });
  }
};
</script>
