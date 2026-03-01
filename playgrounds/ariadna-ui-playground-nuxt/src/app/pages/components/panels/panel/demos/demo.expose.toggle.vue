<template>
  <Panel ref="panel" header="Can be toggled via component Expose">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum eius est
      nesciunt reprehenderit rerum? Aliquam blanditiis consequatur cum ea, enim ipsa laborum odit
      perspiciatis provident sint vel voluptatibus?
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum eius est
      nesciunt reprehenderit rerum? Aliquam blanditiis consequatur cum ea, enim ipsa laborum odit
      perspiciatis provident sint vel voluptatibus?
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum eius est
      nesciunt reprehenderit rerum? Aliquam blanditiis consequatur cum ea, enim ipsa laborum odit
      perspiciatis provident sint vel voluptatibus?
    </p>
  </Panel>

  <Button @click="panelRef?.toggle">Toggle via Expose</Button>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Components
import Panel from '@iwyfaf-vue-ui/ariadna-ui/Panel';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const panelRef = useTemplateRef<InstanceType<typeof Panel>>('panel');
</script>
