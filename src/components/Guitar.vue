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

            div(:class="noteMidi.includes(note.name.includes('/') ? note.name.split('/')[1]+note.octave : note.name+note.octave) ? 'bg-' + noteColor.find(x => x.note == note.name).color : 'opacity-25'")
              .font-weight-bold.text-white.text-shadow {{note.name + note.octave}}
          .col.p-0(v-if="index === 0")
</template>

<script>
import scaleMusic from "@/services/scaleMusic";
var context = new (window.AudioContext || window.webkitAudioContext)();
import MIDI  from "midi.js";

export default {
  props: ["noteColor", "scaleNotes", "midiFile"],
  data() {
    return {
      size: 13,
      noteMidi: "",
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

  created() {
    this.$parent.$on("myevent", (e) => {
      if(e != undefined){
        console.log(e)
      }
      console.log(this.midiFile)
      this.playMusic(this.midiFile);
    });
  },

  methods: {
    start(note) {
      scaleMusic.get("sounds", {
        params: {
          note: note.name,
          oct: note.octave
        },
         responseType: 'arraybuffer',
      }).then(function(response){
         playSound(response.data,context)
      })
    },

    playMusic(song){
      let self = this;
      //TODO put base64 code into a js in scalemusicAPI

      MIDI.loadPlugin({
        soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/MusyngKite/",
        instrument: "acoustic_guitar_nylon",
        onsuccess: function() {
          let player = MIDI.Player;
          MIDI.programChange(0, MIDI.GM.byName["acoustic_guitar_nylon"].number)
          player.timeWarp = 1.7;
          player.loadFile(song, player.start);
          player.addListener(function(data) {
            let note = data.note;
            //message 144 = noteON
            if(data.message == 144){
              self.noteMidi = MIDI.noteToKey[note];
            }
            else{
              self.noteMidi = ""
            }
          });

        //   MIDI.Player.setAnimation(function(data) {
        //     var now = data.now; // where we are now
        //     var end = data.end; // time when song ends
        //     var events = data.events; // all the notes currently being processed
        //     console.log(events)
        //     if(events.message == 144){
        //         console.log(data.events)
        //     }
            
        // });
          //player.start()
          //midijs.noteOn(0, 50, 127, startingPoint);
          //midijs.noteOn(0, note, velocity, delay);
        }
      });
    }
  }
};

function playSound(data,ctx){
    var source = ctx.createBufferSource();
    context.decodeAudioData(data, function(buffer) { source.buffer = buffer;}, null);
    source.connect(ctx.destination);
    source.start(0);
}

</script>
