<template lang="pug">
  .container
    .row(@change="getScaleNotes()")
      .col.mb-3
        strong Note:
        select.form-control(v-model="note")
          option(v-for="note in notes") {{note}}
      .col.mb-3
        strong Scale:
        select.form-control(v-model="scale" )
          option(v-for="scale in scales") {{scale}}
    hr
    .row.no-gutters
      .col(v-for="(note, index) in notesByNote")
        .p-1.border.text-center(:class="[scaleNotes.includes(note) ? ['bg-' + colorsByNote[index]] : 'opacity-25']")
          .font-weight-bold.text-white.text-shadow {{note}}
    hr
    .container-fluid
      Guitar(:noteColor="noteColor" :scaleNotes="scaleNotes")
</template>

<script>
import Guitar from "@/components/Guitar";
import scaleMusic from "@/services/scaleMusic";

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
        { note: "C", color: "gray" },
        { note: "C#", color: "gray-red" },
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
    async getScaleRoman() {
      const { data } = await scaleMusic.get("/scale/roman", {
        params: {
          tonic: this.scale
        }
      });
      this.scaleRoman = data;
    },
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
    await this.getScaleRoman();
  }
};
</script>
