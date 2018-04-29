<template lang="pug">
#app
  .container
    .text-center.mb-3
      .list-inline
        .list-inline-item(v-for="note in notes")
          .btn.btn-secondary
            .font-weight-bold.text-lowercase {{note.name}}
    hr
    .text-center.mb-3
    .row(v-for="i in tunings[0]")
      .col.p-0.border(v-for="note in guitar.notes.slice(i, 24 + i - 1)" @click="start(note.frequency)")
        .text-lowercase.text-center {{note.name + note.octave}}
</template>

<script>
export default {
  data() {
    return {
      notes: [
        {name: "C", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "D", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "E", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "F", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "G", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "A", scale: ["C", "D", "E", "F", "G", "A", "B"]},
        {name: "B", scale: ["C", "D", "E", "F", "G", "A", "B"]},
      ],
      tunings: [
        { 1: 24, 2: 19, 3: 15, 4: 10, 5: 5, 6: 0 }
      ],
      guitar: {
        notes: [
          { name: "E", octave: 2, frequency: 82.41 },
          { name: "F", octave: 2, frequency: 87.31 },
          { name: "Gb", octave: 2, frequency: 92.5 },
          { name: "G", octave: 2, frequency: 98.0 },
          { name: "Ab", octave: 2, frequency: 103.83 },
          { name: "A", octave: 2, frequency: 110.0 },
          { name: "Bb", octave: 2, frequency: 116.54 },
          { name: "B", octave: 2, frequency: 123.47 },
          { name: "C", octave: 3, frequency: 130.81 },
          { name: "Db", octave: 3, frequency: 138.59 },
          { name: "D", octave: 3, frequency: 146.83 },
          { name: "Eb", octave: 3, frequency: 155.56 },
          { name: "E", octave: 3, frequency: 164.81 },
          { name: "F", octave: 3, frequency: 174.61 },
          { name: "Gb", octave: 3, frequency: 185.0 },
          { name: "G", octave: 3, frequency: 196.0 },
          { name: "Ab", octave: 3, frequency: 207.65 },
          { name: "A", octave: 3, frequency: 220.0 },
          { name: "Bb", octave: 3, frequency: 233.08 },
          { name: "B", octave: 3, frequency: 246.94 },
          { name: "C", octave: 4, frequency: 261.63 },
          { name: "Db", octave: 4, frequency: 277.18 },
          { name: "D", octave: 4, frequency: 293.66 },
          { name: "Eb", octave: 4, frequency: 311.13 },
          { name: "E", octave: 4, frequency: 329.63 },
          { name: "F", octave: 4, frequency: 349.23 },
          { name: "Gb", octave: 4, frequency: 369.99 },
          { name: "G", octave: 4, frequency: 392.0 },
          { name: "Ab", octave: 4, frequency: 415.3 },
          { name: "A", octave: 4, frequency: 440.0 },
          { name: "Bb", octave: 4, frequency: 466.16 },
          { name: "B", octave: 4, frequency: 493.88 },
          { name: "C", octave: 5, frequency: 523.25 },
          { name: "Db", octave: 5, frequency: 554.37 },
          { name: "D", octave: 5, frequency: 587.33 },
          { name: "Eb", octave: 5, frequency: 622.25 },
          { name: "E", octave: 5, frequency: 659.25 },
          { name: "F", octave: 5, frequency: 698.46 },
          { name: "Gb", octave: 5, frequency: 739.99 },
          { name: "G", octave: 5, frequency: 783.99 },
          { name: "Ab", octave: 5, frequency: 830.61 },
          { name: "A", octave: 5, frequency: 880.0 },
          { name: "Bb", octave: 5, frequency: 932.33 },
          { name: "B", octave: 5, frequency: 987.77 },
          { name: "C", octave: 6, frequency: 1046.5 },
          { name: "Db", octave: 6, frequency: 1108.73 },
          { name: "D", octave: 6, frequency: 1174.66 }
        ]
      }
    };
  },
  methods: {
    frequency(note) {},
    start(frequency) {
      var ctx = new AudioContext();
      var osc = ctx.createOscillator();
      osc.frequency.value = frequency;
      osc.start();
      osc.connect(ctx.destination);
      this.stop(ctx, osc);
    },
    stop(ctx, osc) {
      osc.stop(ctx.currentTime + 0.2);
    }
  }
}
</script>
