<template lang="pug">
    router-view
</template>

<style lang="sass">
=stripes($primary, $secondary)
  background: repeating-linear-gradient(45deg, $primary, $primary 10px, $secondary 10px, $secondary 20px)

.text-shadow
  text-shadow: 1px 1px 1px #000
.bg
  &-red
    background-color: var(--red)
  &-red-orange
    +stripes(var(--red), var(--orange))
  &-orange
    background-color: var(--orange)
  &-orange-yellow
    +stripes(var(--orange), var(--yellow))
  &-yellow
    background-color: var(--yellow)
  &-green
    background-color: var(--green)
  &-green-blue
    +stripes(var(--red), var(--orange))
  &-blue
    background-color: var(--blue)
  &-blue-purple
    +stripes(var(--blue), var(--purple))
  &-purple
    background-color: var(--purple)
  &-purple-pink
    +stripes(var(--purple), var(--pink))
  &-pink
    background-color: var(--pink)
</style>