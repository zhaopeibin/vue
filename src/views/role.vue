<template>

    <el-card class="box-card">
         <my-bread levl1="权限列表" levl2="权限管理"></my-bread>

<el-col>
    <el-col :span="24">
         <el-button type="primary">添加角色</el-button>
    </el-col>
</el-col>
<!-- 表格 -->
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
          <el-row v-for="(item1,index) in scope.row.children" :key="index">
              <el-col :span="4">
                  <el-tag @close = "delRol(scope.row.id,item1.id)" type="success" closable >{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
              </el-col>
                <el-col :span="20">
                    <el-row v-for="(item2,index) in item1.children" :key="index">
                        <el-col :span="4">
                            <el-tag
                             @close = "delRol(scope.row.id,item2.id)" 
                            type="info" closable>{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-tag
                             @close = "delRol(scope.row.id,item3.id)"
                             type="danger" closable v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length ===0">
              <span>该用户没有任何权限</span>
          </el-row>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type="index">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc">
    </el-table-column>
     <el-table-column
      label="操作"
      >
<template slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="showEdituser(scope.row)">
  
  </el-button>
      
  <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="showDelUser(scope.row)"></el-button>
  
  <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="showCheck(scope.row)"></el-button>
</template>
    </el-table-column>
  </el-table>
    </el-card>
</template>

<script>
export default {
data(){
    return {
        list:[]
    }
},
created(){
    this.loadTable()
},
methods:{
    async delRol(roleId,rightId){
        const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
        console.log(res);
        const{meta:{msg,status}} = res.data
        if(status === 200){
            this.loadTable()
        }
    },
  async loadTable(){
      const res = await this.$http.get('roles')
      console.log(res);
      this.list = res.data.data
      
  }
}
}
</script>

<style>

</style>
