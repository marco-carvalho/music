<template lang="pug">
  .container
    .row
      .col.mb-3
        strong Note:
        select.form-control(v-model="note" @change="setScaleNotes()")
          option(v-for="note in notes") {{note}}
      .col.mb-3
        strong Scale:
        select.form-control(v-model="scale" @change="setScaleNotes()")
          option(v-for="scale in scales") {{scale}}
    .row
      .col.text-center(v-for="note in notes")
        button.btn(:class="{['btn-' + colorsByScale[scaleNotes.indexOf(note)]]: scaleNotes.includes(note)}") {{note}}
    hr
    Guitar(:scaleNotes="scaleNotes" :colors="colorsByScale")
    pre {{$data}}
</template>

<script>
import axios from "axios";
import Guitar from "@/components/Guitar";

export default {
  data() {
    return {
      note: "C",
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
      scale: null,
      scales: [],
      scaleNote: null,
      scaleNotes: [],
      colors: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink",
      ]
    };
  },
  computed: {
    colorsByScale() {
      return this.colors.slice(
        this.scales.indexOf(this.scale)
      ).concat(
        this.colors.slice(
          0,
          this.scales.indexOf(this.scale)
        )
      );
    }
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
        .then(res => res.data);
    },
    getScaleNames() {
      return axios
        .get("https://scalemusicapi.herokuapp.com/scale/names")
        .then(res => res.data);
    },
    setScales() {
      this.getScaleNames().then(res => {
        this.scales = res;
        this.scale = this.scales[0];
        this.setScaleNotes();
      });
    },
    setScaleNotes() {
      this.getScaleNotes(this.note, this.scale).then(res => {
        this.scaleNotes = res;
        this.scaleNote = this.scaleNotes[0];
      });
    }
  },
  mounted() {
    this.setScales();
  }
};
</script>
