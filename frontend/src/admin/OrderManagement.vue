<template>
  <div class="admin-container">
    <table class="table colored-header datatable project-list">
      <thead>
        <tr>
          <th>Table Type</th>
          <th>Table Name</th>
          <th>Booking Time From</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tableInfo, index) in tablesData" :key="index" @click="$router.push('/admin/dashboard/order-details')">
          <td>{{ tableInfo?.table_details?.table_type || `Parcel ${index+1}` }}</td>
          <td>{{ tableInfo?.table_details?.table_name || "" }}</td>
          <td>{{new Date(tableInfo?.table_details?.date || new Date()) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TableAddOrEdit",
  data() {
    return {
      tablesData: [],
    };
  },
  mounted() {
    this.fetchBookedTables();
  },
  methods: {
    async fetchBookedTables() {
      try {
        const response = await axios.get("orders");
        this.tablesData = response?.data || [];
        this.tablesData =
          this.tablesData && this.tablesData.length > 0
            ? this.tablesData.map((table) => {
                table.table_details = JSON.parse(table?.table_details || "{}");
                return table;
              })
            : [];
        console.log("error", response);
      } catch (error) {
        console.log("error", error.data);
      }
    },
    async deleteTableConfig(id) {
      try {
        const response = await axios.delete("book-tables/" + id);
        await this.fetchBookedTables();
        console.log("error", response);
      } catch (error) {
        console.log("error", error.data);
      }
    },
  },
};
</script>

<style scoped>
.admin-container {
  background-color: #fff;
  min-height: calc(100vh - 109px);
  padding: 4em;
  font-size: 16px;
}

.admin-container {
  background-color: #fff;
  min-height: calc(100vh - 109px);
  padding: 4em;
  font-size: 16px;
}

.project-list > tbody > tr > td {
  padding: 12px 8px;
}

.project-list > tbody > tr > td .avatar {
  width: 22px;
  border: 1px solid #ccc;
}
</style>
