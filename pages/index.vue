<template>
  <div class="">
    <Grid>
      <template #header>
        <div class="ml-5">
          <q-btn label="Setting" color="primary" @click="isOpenPopup = true" />
          <!-- <SettingPopup v-if="isOpenPopup" isOpenPopup="isOpenPopup" /> -->
          <q-dialog v-model="isOpenPopup" class="custom-dialog">
            <q-card class="custom-card">
              <q-card-section>
                <div class="text-h6">Table setting</div>
              </q-card-section>

              <q-separator />

              <q-card-section style="max-height: 50vh" class="scroll">
                <p>View column</p>
                <div class="flex flex-wrap mt-5">
                  <div
                    v-for="col in columns"
                    key="col.id"
                    class="flex items-center mr-10"
                  >
                    <input
                      :id="`colum-${col.label}`"
                      type="checkbox"
                      :checked="col.active"
                      class="mr-1"
                      @change="
                        (e) => {
                          handleChange(e.target.checked, col.id);
                        }
                      "
                    />
                    <label :for="`colum-${col.label}`">{{ col.label }}</label>
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Apply"
                  color="primary"
                  @click="handleApply"
                />
                <q-btn
                  flat
                  label="Reset"
                  color="primary"
                  @click="handleReset"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template #default>
        <TableComponent :visibleColumns="visibleColumns" />
      </template>
    </Grid>
  </div>
</template>

<script setup>
import lodash from "lodash";
import listColumns from "@/assets/data/listColumns.json";
useHead({
  title: "Demo Quasar",
});

const visibleColumns = ref(
  lodash.cloneDeep(listColumns).map((col) => col.name)
);
const isOpenPopup = ref(false);
const columns = ref(lodash.cloneDeep(listColumns));

const handleChange = (value, id) => {
  const rawColumns = toRaw(columns.value);
  const findColumn = rawColumns.find((column) => column.id === id);
  findColumn.active = value;
  columns.value = rawColumns;
};
const handleApply = () => {
  const cols = [];
  columns.value.forEach((val) => {
    if (val.active) {
      cols.push(val.name);
    }
  });
  visibleColumns.value = cols;
  isOpenPopup.value = false;
};
const handleReset = () => {
  const cols = [];
  columns.value = listColumns;
  listColumns.forEach((val) => {
    if (val.active) {
      cols.push(val.name);
    }
  });
  visibleColumns.value = cols;
  isOpenPopup.value = false;
};
</script>
<style scoped lang="scss">
.custom-dialog {
  .custom-card {
    min-width: 500px;
    max-width: 700px;
  }
}
</style>
