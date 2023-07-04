<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="open" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>123</div>
  </div>
</template>

<script setup>
const props = defineProps(["isOpenPopup"]);
const open = ref(false);

watch(
  () => props.isOpenPopup,
  () => {
    open.value = props.isOpenPopup;
  }
);
</script>
