<template lang="pug">
  .container
    .row(@change="setScaleNotes()")
      .col.mb-3
        strong Note:
        select.form-control(v-model="note")
          option(v-for="note in notes") {{note}}
      .col.mb-3
        strong Scale:
        select.form-control(v-model="scale" )
          option(v-for="scale in scales") {{scale}}
    hr
    .row
      .col(v-for="(note, index) in notesByNote")
        .p-1.border.text-center(:class="[scaleNotes.includes(note) ? ['bg-' + colorsByNote[index]] : 'bg-secondary']")
          .font-weight-bold.text-white.text-shadow {{note}}
    hr
    .container-fluid
      Guitar(:noteColor="noteColor")
</template>

<script>
import Guitar from "@/components/Guitar";

export default {
  data() {
    return {
      note: "C",
      notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
      colors: [
        "gray",
        "gray-red",
        "red",
        "red-orange",
        "orange",
        "yellow",
        "yellow-green",
        "green",
        "green-blue",
        "blue",
        "blue-purple",
        "purple"
      ],
      noteColor: [
        { note: "C", color: "white" },
        { note: "C#", color: "white-red" },
        { note: "D", color: "red" },
        { note: "D#", color: "red-orange" },
        { note: "E", color: "orange" },
        { note: "F", color: "yellow" },
        { note: "F#", color: "yellow-green" },
        { note: "G", color: "green" },
        { note: "G#", color: "green-blue" },
        { note: "A", color: "blue" },
        { note: "A#", color: "blue-purple" },
        { note: "B", color: "purple" }
      ],
      scale: null,
      scales: [],
      scaleNote: null,
      scaleNotes: []
    };
  },
  computed: {
    notesByNote() {
      return this.notes
        .slice(this.notes.indexOf(this.note))
        .concat(this.notes.slice(0, this.notes.indexOf(this.note)));
    },
    colorsByNote() {
      return this.colors
        .slice(this.notes.indexOf(this.note))
        .concat(this.colors.slice(0, this.notes.indexOf(this.note)));
    }
  },
  components: {
    Guitar
  },
  methods: {
    getScaleNotes(note, tonic) {
      return this.axios
        .get("https://scalemusicapi.herokuapp.com/scale/notes", {
          params: {
            note,
            tonic
          }
        })
        .then(res => res.data);
    },
    getScaleNames() {
      return this.axios
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
