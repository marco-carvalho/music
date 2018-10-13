<template lang="pug">
  div
    .row.no-gutters.text-center
      .col.p-0(v-for="(note, index) in size")
        .row.no-gutters
          .col.p-0
            .font-weight-bold.text-white.text-shadow {{index}}
          .col.p-0(v-if="index === 0")
    .row.no-gutters.text-center(v-for="string in strings")
      .col.p-0(v-for="(note, index) in guitar.notes.slice(string, size + string)" @click="start(note)")
        .row.no-gutters
          .col.p-0.border
            div(:class="scaleNotes.includes(note.name) ? 'bg-' + noteColor.find(x => x.note === note.name).color : 'opacity-25'")
              .font-weight-bold.text-white.text-shadow {{note.name}}
          .col.p-0(v-if="index === 0")
</template>

<script>
var Soundfont = require("soundfont-player");
var context = new (window.AudioContext || window.webkitAudioContext)();
export default {
  props: ["noteColor", "scaleNotes"],
  data() {
    return {
      size: 13,
      ctx: new (window.AudioContext || window.webkitAudioContext)(),
      strings: [4, 9, 14, 19, 23, 28],
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
    start(note) {
      Soundfont.instrument(context, "acoustic_guitar_nylon").then(function(
        clavinet
      ) {
        var noteWithOctave = note.name.split("/")[0] + note.octave;
        console.log(noteWithOctave);
        clavinet.play(noteWithOctave);
      });
    }
  }
};
</script>
