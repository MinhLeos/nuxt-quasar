<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th
            v-for="(column, index) in tableColumns"
            :key="index"
            :style="{ width: column.width }"
          >
            {{ column.label }}
            <div
              class="resize-handle"
              @mousedown="startResize($event, index)"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableRows" :key="rowIndex">
          <td v-for="(column, colIndex) in tableColumns" :key="colIndex">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableRows: [
        {
          column1: "1",
          column2: "2",
        },
        {
          column1: "11",
          column2: "22",
        },
        {
          column1: "111",
          column2: "222",
        },
      ],
      tableColumns: [
        { label: "Column 1", field: "column1", width: "100px" },
        { label: "Column 2", field: "column2", width: "200px" },
        // Add more columns as needed
      ],
      isResizing: false,
      resizeStartX: 0,
      resizeColumnIndex: 0,
    };
  },
  methods: {
    startResize(event, columnIndex) {
      this.isResizing = true;
      this.resizeStartX = event.clientX;
      this.resizeColumnIndex = columnIndex;
      document.addEventListener("mousemove", this.resizeColumn);
      document.addEventListener("mouseup", this.stopResize);
    },
    resizeColumn(event) {
      if (this.isResizing) {
        const offsetX = event.clientX - this.resizeStartX;
        const newWidth =
          parseInt(this.tableColumns[this.resizeColumnIndex].width) + offsetX;
        this.tableColumns[this.resizeColumnIndex].width = `${newWidth}px`;
      }
    },
    stopResize() {
      this.isResizing = false;
      document.removeEventListener("mousemove", this.resizeColumn);
      document.removeEventListener("mouseup", this.stopResize);
    },
  },
};
</script>

<style>
.table-container {
  overflow-x: auto;
}

.custom-table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

.custom-table th {
  position: relative;
  background-color: #f5f5f5;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.resize-handle {
  position: absolute;
  right: -5px;
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: col-resize;
  background-color: #ccc;
}

.custom-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
