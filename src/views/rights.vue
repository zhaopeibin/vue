<template>

<el-card class="box-card"> 
    <my-bread levl1="权限列表" levl2="权限管理"></my-bread>

    <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="80">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      
      label="层级">
      <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一级</span>
            <span v-else-if="scope.row.level==='1'">二级</span>
            <span v-else-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
</el-card>       
</template>

<script>
export default {

    data(){
        return{
            list:[]
        }
    },
    created(){
            this.loadTable()
    },
    methods:{
     async loadTable(){
         const res = await this.$http.get('rights/list')
         console.log(res);
         this.list = res.data.data
         
        }
    }
}
</script>

<style>

</style>

