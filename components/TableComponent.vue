<template>
  <!--
      Forked from:
      https://v1.quasar-framework.org/vue-components/table#Example--Custom-top-with-add%2Fremove-row
    -->
  <div id="q-app">
    <div class="q-pa-md">
      <q-table
        ref="tableRef"
        class="my-sticky-header-table"
        title="Products"
        :rows="listProduct"
        :columns="columns"
        :visible-columns="props.visibleColumns"
        :pagination="pagination"
        row-key="id"
        card-class="demo-class"
        separator="cell"
        virtual-scroll
        v-resize
      >
        <template v-slot:header>
          <q-tr class="table-header border border-solid border-current">
            <q-th>
              <div class="q-pa-md">
                <q-checkbox
                  v-model="isSelectedAll"
                  @update:model-value="handleSelectAll"
                />
              </div>
            </q-th>
            <q-th v-for="col in props.visibleColumns" :key="col" class="">
              <div
                @click="handleSelectSortValue(col)"
                class="flex flex-nowrap items-center justify-start custom"
                :class="{
                  'cursor-pointer':
                    col !== 'color' && col !== 'image' && col !== 'status',
                }"
              >
                <span class="text-lg font-bold text-purple">{{ col }}</span>
                <img
                  v-if="col !== 'color' && col !== 'image' && col !== 'status'"
                  class="w-5 h-5 mx-2 !hover:visible"
                  :class="{
                    'rotate-180':
                      sortValue !== col || (sortValue == col && isAsc),
                    invisible: sortValue !== col,
                  }"
                  :src="sort"
                  alt="Sort"
                />
              </div>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr class="table-body" :props="props">
            <q-td>
              <div class="q-pa-md">
                <q-checkbox
                  v-model="props.row.isSelect"
                  @update:model-value="handleSelectProduct"
                />
              </div>
            </q-td>
            <q-td key="id" :props="props">
              {{ props.row.id }}
              <q-popup-edit v-model="props.row.id" v-slot="scope">
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                v-model="props.row.name"
                title="Update Name"
                buttons
                v-slot="scope"
              >
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="brand" :props="props">
              <div class="text-pre-wrap">{{ props.row.brand }}</div>
              <q-popup-edit v-model="props.row.brand" v-slot="scope">
                <q-input
                  type="text"
                  v-model="scope.value"
                  @keyup.enter="scope.set"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td key="color" :props="props">
              {{ props.row.color }}
              <q-popup-edit
                v-model="props.row.color"
                title="Update color"
                buttons
                persistent
                v-slot="scope"
              >
                <q-input
                  type="text"
                  v-model="scope.value"
                  dense
                  autofocus
                  hint="Use buttons to close"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="image" :props="props"
              >{{ props.row.image }}
              <q-popup-edit
                v-model="props.row.image"
                title="Update image"
                buttons
                persistent
                v-slot="scope"
              >
                <q-input
                  type="text"
                  v-model="scope.value"
                  dense
                  autofocus
                  hint="Use buttons to close"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="price" :props="props"
              >{{ props.row.price }}
              <q-popup-edit
                v-model="props.row.price"
                title="Update price"
                buttons
                persistent
                v-slot="scope"
              >
                <q-input
                  type="number"
                  v-model="scope.value"
                  dense
                  autofocus
                  hint="Use buttons to close"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="status" :props="props"
              >{{ props.row.status }}
              <q-popup-edit
                v-model="props.row.status"
                title="Update status"
                buttons
                persistent
                v-slot="scope"
              >
                <q-input
                  type="text"
                  v-model="scope.value"
                  dense
                  autofocus
                  hint="Use buttons to close"
                />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div class="flex items-center justify-between w-full">
            <div class="q-pa-lg flex flex-center">
              <q-pagination
                v-model="currentPage"
                :max="max"
                :max-pages="6"
                direction-links
                boundary-links
                icon-first="skip_previous"
                icon-last="skip_next"
                icon-prev="fast_rewind"
                icon-next="fast_forward"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center relative">
                <p>Records per page: {{ pageSize }}</p>
                <div
                  class="select-page-size"
                  @click="handleClickOpenListPageSize"
                >
                  >
                </div>
                <div
                  v-if="isShowPopupSelectPageSize"
                  class="absolute top-[-1.5rem] left-32 z-50 bg-white w-10 shadow-xl"
                >
                  <p
                    v-for="item in listPageSize"
                    :key="`page-size-${item}`"
                    class="my-1 p-1 cursor-pointer hover:bg-slate-200"
                    :class="{ 'text-pink-600': item == pageSize }"
                    @click="handleSelectPageSize(item)"
                  >
                    {{ item }}
                  </p>
                </div>
              </div>
              <p class="ml-16">{{ dataPerPage }}</p>
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import lodash from "lodash";
import listColumns from "@/assets/data/listColumns.json";
import sort from "@/assets/image/icons/sort.svg";
// import listProduct from "@/assets/data/listProduct.json";
const listPageSize = [5, 10, 15];
const props = defineProps(["visibleColumns"]);
const listProduct = ref([]);
const columns = ref(lodash.cloneDeep(listColumns));
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const sortValue = ref("id");
const isAsc = ref(true);
const isShowPopupSelectPageSize = ref(false);
const tableRef = ref(null);
const selected = ref([]);
const lastIndex = ref(null);
const isSelectedAll = ref(false);

const $q = useQuasar();

const { data: products, error } = await useFetch(
  `/api/products?pageSize=${pageSize.value}&currentPage=${currentPage.value}`
);
listProduct.value = products.value?.products || [];
total.value = products.value?.total || 0;

const pagination = computed(() => ({
  page: currentPage.value,
  rowsPerPage: pageSize.value,
  rowsNumber: pageSize.value,
}));

const max = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});
const dataPerPage = computed(() => {
  const start =
    (currentPage.value - 1) * pageSize.value + 1 > total.value
      ? total.value
      : (currentPage.value - 1) * pageSize.value + 1;
  const end =
    currentPage.value * pageSize.value > total.value
      ? total.value
      : currentPage.value * pageSize.value;
  return `${start}-${end}/${total.value}`;
});

const handleSelectSortValue = (value: string) => {
  if (value === "color" || value === "image" || value === "status") return;
  if (sortValue.value === value) {
    isAsc.value = !isAsc.value;
  } else {
    sortValue.value = value;
    isAsc.value = false;
  }
};

const handleClickOpenListPageSize = () => {
  isShowPopupSelectPageSize.value = true;
};
const handleSelectPageSize = (value) => {
  pageSize.value = value;
  isShowPopupSelectPageSize.value = false;
};

const handleSelectAll = (value, evt) => {
  listProduct.value = listProduct.value.map((product) => {
    return {
      ...product,
      isSelect: !!value,
    };
  });
};

const handleSelectProduct = () => {
  let countSelected = 0;
  listProduct.value.forEach((product) => {
    if (product.isSelect) countSelected++;
  });
  if (countSelected === 0) {
    isSelectedAll.value = false;
  } else if (countSelected === listProduct.value.length) {
    isSelectedAll.value = true;
  } else {
    isSelectedAll.value = null;
  }
};

function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${listProduct.length}`;
}

function onSelection({ rows, added, evt }) {
  if (rows.length === 0 || tableRef.value === void 0) {
    return;
  }

  const row = rows[0];
  const filteredSortedRows = tableRef.value.filteredSortedRows;
  const rowIndex = filteredSortedRows.indexOf(row);
  const localLastIndex = lastIndex.value;

  lastIndex.value = rowIndex;
  document.getSelection().removeAllRanges();

  if ($q.platform.is.mobile === true) {
    evt = { ctrlKey: true };
  } else if (
    evt !== Object(evt) ||
    (evt.shiftKey !== true && evt.ctrlKey !== true)
  ) {
    selected.value = added === true ? rows : [];
    return;
  }

  const operateSelection =
    added === true
      ? (selRow) => {
          const selectedIndex = selected.value.indexOf(selRow);
          if (selectedIndex === -1) {
            selected.value = selected.value.concat(selRow);
          }
        }
      : (selRow) => {
          const selectedIndex = selected.value.indexOf(selRow);
          if (selectedIndex > -1) {
            selected.value = selected.value
              .slice(0, selectedIndex)
              .concat(selected.value.slice(selectedIndex + 1));
          }
        };

  if (localLastIndex === null || evt.shiftKey !== true) {
    operateSelection(row);
    return;
  }

  const from = localLastIndex < rowIndex ? localLastIndex : rowIndex;
  const to = localLastIndex < rowIndex ? rowIndex : localLastIndex;
  for (let i = from; i <= to; i += 1) {
    operateSelection(filteredSortedRows[i]);
  }
}

watch(
  [pageSize, currentPage, sortValue, isAsc],
  async (value) => {
    isSelectedAll.value = false;
    const { data: products, error } = await useFetch(
      `/api/products?pageSize=${value[0]}&currentPage=${value[1]}&sortValue=${value[2]}&isAsc=${value[3]}`
    );
    listProduct.value = products.value?.products || [];
    total.value = products.value?.total || 0;
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  () => listProduct.value,
  () => {
    console.log("list product: ", listProduct.value);
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.my-sticky-header-table {
  /* height or max-height is important */
  // height: min-contentt;
  max-height: 670px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #00b4ff;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  /* this will be the loading indicator */
  thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
  thead tr:first-child th {
    top: 0;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }
  // text-align: center !important;
  // .q-table__middle {
  //   max-height: 600px;
  // }

  // .q-table__top,
  // .q-table__bottom,
  // thead tr:first-child th {
  //   background-color: #f5f5dc;
  // }

  // thead tr:first-child th {
  //   position: sticky;
  //   top: 0;
  // }
  // .q-table {
  //   text-align: center !important;
  // }
  // .q-table tbody td {
  //   text-align: center !important;
  // }
}
.select-page-size {
  transform: rotate(90deg);
  margin-left: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 15px;
}
.custom {
  &:hover img {
    visibility: visible !important;
  }
}
.table {
  &-body {
    &:last-child .q-td {
      border-bottom-width: 1px;
    }
    .q-td {
      // border-collapse: collapse;
      text-align: left !important;
      // border: 0.5px solid;
    }
  }
  &-header {
    position: sticky;
    top: 0;
    z-index: 10;
    th {
      text-align: left !important;
      // cursor: col-resize !important;
    }
  }
}
</style>
