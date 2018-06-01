<template lang="pug">
    router-view
</template>

<style lang="sass">
=stripes($primary, $secondary)
  background: repeating-linear-gradient(45deg, $primary, $primary 10px, $secondary 10px, $secondary 20px)

.text-shadow
  text-shadow: 1px 1px 1px #000
.bg
  &-white
    background-color: var(--white)
  &-white-red
    +stripes(var(--white), var(--red))
  &-red
    background-color: var(--red)
  &-red-orange
    +stripes(var(--red), var(--orange))
  &-orange
    background-color: var(--orange)
  &-yellow
    background-color: var(--yellow)
  &-yellow-green
    +stripes(var(--yellow), var(--green))
  &-green
    background-color: var(--green)
  &-green-blue
    +stripes(var(--green), var(--blue))
  &-blue
    background-color: var(--blue)
  &-blue-purple
    +stripes(var(--blue), var(--purple))
  &-purple
    background-color: var(--purple)
</style>
