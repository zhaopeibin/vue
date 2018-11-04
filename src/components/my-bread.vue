<template>
    <el-breadcrumb separator="/">
  
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item>{{levl1}}</el-breadcrumb-item>
  
      <el-breadcrumb-item>{{levl2}}</el-breadcrumb-item>
  
    </el-breadcrumb>
</template>

<script>
export default {
    name:'my-beard',
    props:['levl1','levl2']
}
</script>

<style>

</style>
