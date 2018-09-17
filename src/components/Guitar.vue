<template lang="pug">
  div
    .row(v-for="i in tuning")
      .col.p-0.border(v-for="note in guitar.notes.slice(i, 13 + i)" @click="start(note.frequency)")
        .text-center(:class="[scaleNotes.includes(note.name) ? ['bg-' + noteColor.find(x => x.note === note.name).color] : 'opacity-25']")
          .font-weight-bold.text-white.text-shadow {{note.name}}
</template>

<script>
import scaleMusic from "@/services/scaleMusic"

export default {
  props: ["noteColor", "scaleNotes"],
  data() {
    return {
      ctx: new (window.AudioContext || window.webkitAudioContext)(),
      tuning: {
        1: 4,
        2: 9,
        3: 14,
        4: 19,
        5: 23,
        6: 28
      },
      guitar: {
        notes: [
          { name: "C", octave: 2 },
          { name: "C#/Db", octave: 2 },
          { name: "D", octave: 2 },
          { name: "D#/Eb", octave: 2 },
          { name: "E", octave: 2 },
          { name: "F", octave: 2 },
          { name: "F#/Gb", octave: 2 },
          { name: "G", octave: 2 },
          { name: "G#/Ab", octave: 2 },
          { name: "A", octave: 2 },
          { name: "A#/Bb", octave: 2 },
          { name: "B", octave: 2 },
          { name: "C", octave: 3 },
          { name: "C#/Db", octave: 3 },
          { name: "D", octave: 3 },
          { name: "D#/Eb", octave: 3 },
          { name: "E", octave: 3 },
          { name: "F", octave: 3 },
          { name: "F#/Gb", octave: 3 },
          { name: "G", octave: 3 },
          { name: "G#/Ab", octave: 3 },
          { name: "A", octave: 3 },
          { name: "A#/Bb", octave: 3 },
          { name: "B", octave: 3 },
          { name: "C", octave: 4 },
          { name: "C#/Db", octave: 4 },
          { name: "D", octave: 4 },
          { name: "D#/Eb", octave: 4 },
          { name: "E", octave: 4 },
          { name: "F", octave: 4 },
          { name: "F#/Gb", octave: 4 },
          { name: "G", octave: 4 },
          { name: "G#/Ab", octave: 4 },
          { name: "A", octave: 4 },
          { name: "A#/Bb", octave: 4 },
          { name: "B", octave: 4 },
          { name: "C", octave: 5 },
          { name: "C#/Db", octave: 5 },
          { name: "D", octave: 5 },
          { name: "D#/Eb", octave: 5 },
          { name: "E", octave: 5 },
          { name: "F", octave: 5 },
          { name: "F#/Gb", octave: 5 },
          { name: "G", octave: 5 },
          { name: "G#/Ab", octave: 5 },
          { name: "A", octave: 5 },
          { name: "A#/Bb", octave: 5 },
          { name: "B", octave: 5 },
          { name: "C", octave: 6 },
          { name: "C#/Db", octave: 6 },
          { name: "D", octave: 6 }
        ]
      }
    };
  },
  methods: {
    start(frequency) {
      this.ctx.resume();
      let osc = this.ctx.createOscillator();
      osc.frequency.value = frequency;
      osc.start();
      osc.connect(this.ctx.destination);
      osc.stop(this.ctx.currentTime + 0.5);
    }
  },
  mounted() {
    this.guitar.notes.forEach(async note => {
      const {data} = await scaleMusic.get("note/freq", {
        params: {
          note: note.name,
          oct: note.octave
        }
      });
      note.frequency = data;
    });
  }
};
</script>
