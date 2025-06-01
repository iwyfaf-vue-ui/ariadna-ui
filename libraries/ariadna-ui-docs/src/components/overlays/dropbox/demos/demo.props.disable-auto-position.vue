<template>
  <Dropbox v-model="popoverValue" disable-auto-position>
    <template #activator="{ toggle }">
      <Button @click="toggle">
        {{ popoverValue ? 'Close' : 'Open' }}
      </Button>
    </template>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto, dolorem ducimus
      ea expedita harum illum iusto natus nemo nihil, nobis nulla numquam odio officia quas, quod
      recusandae repudiandae voluptatem.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto, dolorem ducimus
      ea expedita harum illum iusto natus nemo nihil, nobis nulla numquam odio officia quas, quod
      recusandae repudiandae voluptatem.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto, dolorem ducimus
      ea expedita harum illum iusto natus nemo nihil, nobis nulla numquam odio officia quas, quod
      recusandae repudiandae voluptatem.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto, dolorem ducimus
      ea expedita harum illum iusto natus nemo nihil, nobis nulla numquam odio officia quas, quod
      recusandae repudiandae voluptatem.
    </p>
  </Dropbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Dropbox from '@iwyfaf-vue-ui/ariadna-ui/Dropbox';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const popoverValue = ref(false);
</script>
