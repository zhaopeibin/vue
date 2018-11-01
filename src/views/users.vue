<template>
   <el-card class="box-card">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
 
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-row>
    <el-col :span="20">
<el-input placeholder="请输入内容" class="input-with-select">
    
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  </el-col >
  <el-col :span="4">
      <el-button type="success">添加用户</el-button>

  </el-col>
  </el-row>
  <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        prop="date"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
       <el-table-column prop="email" label="邮箱" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120">
        </el-table-column>
        <el-table-column
          prop="create_time"
        label="创建日期">
        </el-table-column>
        <el-table-column
          prop="create_time"
        label="用户状态">
        </el-table-column>

      <el-table-column
        
        label="操作">
      </el-table-column>
    </el-table>
</el-card>
   
</template>
<script>
export default {
     data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
}
</script>
<style>
    
</style>

