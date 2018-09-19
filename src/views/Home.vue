<template lang="pug">
  .container
    .row(@change="getScaleNotes()")
      .col.mb-3
        strong Nota:
        select.form-control(v-model="note")
          option(v-for="note in notes") {{note}}
      .col.mb-3
        strong Escala:
        select.form-control(v-model="scale" )
          option(v-for="scale in scales") {{scale}}
    hr
    .row.no-gutters
      .col(v-for="(note, index) in notesByNote")
        .p-1.border.text-center(:class="[scaleNotes.includes(note) ? ['bg-' + colorsByNote[index]] : 'opacity-25']")
          .font-weight-bold.text-white.text-shadow {{note}}
    hr
    Guitar(:noteColor="noteColor" :scaleNotes="scaleNotes")
</template>

<script>
import Guitar from "@/components/Guitar";
import scaleMusic from "@/services/scaleMusic";

export default {
  data() {
    return {
      note: "C",
      notes: ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"],
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
        { note: "C", color: "gray" },
        { note: "C#/Db", color: "gray-red" },
        { note: "D", color: "red" },
        { note: "D#/Eb", color: "red-orange" },
        { note: "E", color: "orange" },
        { note: "F", color: "yellow" },
        { note: "F#/Gb", color: "yellow-green" },
        { note: "G", color: "green" },
        { note: "G#/Ab", color: "green-blue" },
        { note: "A", color: "blue" },
        { note: "A#/Bb", color: "blue-purple" },
        { note: "B", color: "purple" }
      ],
      scale: null,
      scales: [],
      scaleNote: null,
      scaleNotes: [],
      scaleRoman: []
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
    async getScaleNotes() {
      const { data } = await scaleMusic.get("/scale/notes", {
        params: {
          note: this.note,
          tonic: this.scale
        }
      });
      this.scaleNotes = data;
      this.scaleNote = this.scaleNotes[0];
    },
    async getScales() {
      const { data } = await scaleMusic.get("/scales");
      this.scales = data;
      this.scale = this.scales[0];
    }
  },
  async mounted() {
    await this.getScales();
    await this.getScaleNotes();
  }
};
</script>
