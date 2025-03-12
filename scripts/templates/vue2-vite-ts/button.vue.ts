export default (): string => {
  return `<template>
  <button class="btn-cmp" :class="colorClasses">tests</button>
</template>

<script>
export default {
  props: {
    color: {
      validator(value) {
        return ['blue', 'red', 'black'].indexOf(value) !== -1;
      },
      default: 'blue',
    }
  },
  computed: {
    colorClasses() {
      return {
        'btn-cmp--color-blue': this.color === 'blue',
        'btn-cmp--color-red': this.color === 'red',
        'btn-cmp--color-black': this.color === 'black',
      };
    }
  }
}
</script>

<style lang="scss">
$this: '.btn-cmp';
#{$this} {
  color: white;
}

#{$this}--color-blue {
  color: white;
  background: cornflowerblue;
}

#{$this}--color-red {
  color: white;
  background: darkred;
}

#{$this}--color-black {
  color: white;
  background: black;
}
</style>
`;
};
