<template>
  <el-card class="box-card">
  
    <el-breadcrumb separator="/">
  
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  
    </el-breadcrumb>
  
    <el-row>
  
      <el-col :span="20">
  
        <el-input placeholder="请输入内容" clearable v-model="searchVal" class="input-with-select">
  
  
  
          <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
  
        </el-input>
  
      </el-col>
  
      <el-col :span="4">
  
        <el-button type="success" @click="Adduser()">添加用户</el-button>
  
  
  
      </el-col>
  
    </el-row>
  
    <!-- 分配角色 -->
  
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRouerUser">
  
      <el-form>
  
        <el-form-item label="用户名" :label-width="formLabelWidth">
  
          {{currUserName}}
  
        </el-form-item>
  
        <el-form-item label="角色" :label-width="formLabelWidth">
  
          <el-select v-model="currRoleId">
  
            <el-option label="请选择" :value="-1"></el-option>
  
            <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id">
  
            </el-option>
  
          </el-select>
  
        </el-form-item>
  
      </el-form>
  
      <div slot="footer" class="dialog-footer">
  
        <el-button @click="dialogFormVisibleRouerUser = false">取 消</el-button>
  
        <el-button type="primary" @click="creatUser()">确 定</el-button>
  
      </div>
  
    </el-dialog>
  
    <!-- 修改 对话框 -->
  
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdituser">
  
      <el-form :model="formdata">
  
        <el-form-item label="用户名" :label-width="formLabelWidth">
  
          <el-input disabled v-model="formdata.username" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
        <el-form-item label="邮箱" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
        <el-form-item label="电话" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
  
  
      </el-form>
  
      <div slot="footer" class="dialog-footer">
  
        <el-button @click="dialogFormVisibleEdituser = false">取 消</el-button>
  
        <el-button type="primary" @click="Edituser()">确 定</el-button>
  
      </div>
  
    </el-dialog>
  
    <!--添加 对话框 -->
  
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
  
      <el-form :model="formdata">
  
        <el-form-item label="用户名" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
  
        </el-form-item>
  
        <el-form-item label="密码" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
        <el-form-item label="邮箱" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
        <el-form-item label="电话" :label-width="formLabelWidth">
  
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
  
        </el-form-item>
  
  
  
  
  
      </el-form>
  
      <div slot="footer" class="dialog-footer">
  
        <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
  
        <el-button type="primary" @click="AdduserOver()">确 定</el-button>
  
      </div>
  
    </el-dialog>
  
    <!-- 表格 -->
  
    <el-table :data="list" style="width: 100%" v-loading="loading">
  
      <el-table-column type="index" prop="date" label="#" width="80">
  
      </el-table-column>
  
      <el-table-column prop="username" label="姓名" width="80">
  
      </el-table-column>
  
      <el-table-column prop="email" label="邮箱" width="120">
  
      </el-table-column>
  
      <el-table-column prop="mobile" label="电话" width="120">
  
      </el-table-column>
  
      <el-table-column label="创建日期">
  
        <template slot-scope="scope">
  
              {{scope.row.create_time | fmtDate}}
</template>
        </el-table-column>
        <el-table-column   label="用户状态">
<template slot-scope="scope">
  <el-switch @change="changeUser(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
  
  </el-switch>
</template>
            
        </el-table-column>

      <el-table-column label="操作">
<template slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="showEdituser(scope.row)">
  
  </el-button>
  
  
  
  <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="showDelUser(scope.row)"></el-button>
  
  <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="showCheck(scope.row)"></el-button>
</template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
   
   
</template>
<script>
  export default {
  
    mounted() {
  
      this.loadTable()
  
    },
  
    methods: {

    async creatUser(){
      this.dialogFormVisibleRouerUser = false
        
        const res = await this.$http.put(`users/${this.getRoleByUserId}/role`,{
          rid:this.currRoleId
        })
       
        const {meta:{status,msg}} = res.data
        if (status===200) {
          this.$message.success(msg)
        }
    },
  
      async showCheck(user) {
  
        this.getRoleByUserId = user.id
  
  
  
        this.dialogFormVisibleRouerUser = true
  
        this.currUserName = user.username
  
  
  
        const res = await this.$http.get('roles')
  
        console.log(res)
  
  
  
        this.roles = res.data.data
  
  
  
        const res1 = await this.$http.get(`users/${user.id}`)
  
        console.log(res1)
  
  
  
        this.currRoleId = res1.data.data.rid
  
      },
  
      async Edituser() {
  
        this.dialogFormVisibleEdituser = false
  
        const res = await this.$http.post(`users/${user.id}`, this.formdata)
  
      },
  
      showEdituser(user) {
  
        this.dialogFormVisibleEdituser = true
  
        this.formdata = user
  
        this.currUserId = user.id
  
      },
  
      async AdduserOver() {
  
        this.dialogFormVisibleAdduser = false
  
        const res = await this.$http.post('users', this.formdata)
  
        console.log(res)
  
        const {
  
          meta: {
  
            msg,
  
            status
  
          }
  
        } = res.data
  
        if (status === 200) {
  
          for (const key in this.formData) {
  
            if (this.formData.hasOwnProperty(key)) {
  
              this.formData[key] = ''
  
            }
  
          }
  
          // 提示框
  
          this.$message.success(msg)
  
          this.loadTable()
  
  
  
        }
  
  
  
      },
  
      Adduser() {
  
        this.dialogFormVisibleAdduser = true
  
      },
  
      showDelUser(user) {
  
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  
          confirmButtonText: '确定',
  
          cancelButtonText: '取消',
  
          type: 'warning'
  
        }).then(async() => {
  
          const res = await this.$http.delete(`users/${user.id}`)
  
          const {
  
            meta: {
  
              msg,
  
              status
  
            }
  
          } = res.data
  
          if (status === 200) {
  
            this.loadTable()
  
            // 提示框
  
            this.$message({
  
              type: 'success',
  
              message: '删除成功!'
  
            });
  
  
  
          }
  
  
  
        }).catch(() => {
  
          this.$message({
  
            type: 'info',
  
            message: '已取消删除'
  
          });
  
        });
  
      },
  
      async changeUser(user) {
  
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
  
        // console.log(res)
  
        const {
  
          meta: {
  
            msg,
  
            status
  
          }
  
        } = res.data
  
        if (status === 200) {
  
          // 提示框
  
  
  
          this.$message.success(msg)
  
        }
  
      },
  
      async searchUser() {
  
        this.loadTable()
  
      },
  
      // 分页方法
  
      handleSizeChange(val) {
  
        console.log(`每页 ${val} 条`);
  
        this.pagesize = val
  
        this.loadTable()
  
      },
  
      handleCurrentChange(val) {
  
        console.log(`当前页: ${val}`);
  
        this.pagenum = val
  
        this.loadTable()
  
      },
  
      async loadTable() {
  
        this.loading = true
  
        const AUTH_TOKEN = sessionStorage.getItem('token')
  
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
  
        const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
  
        //  console.log(res)
  
        const {
  
          meta,
  
          data
  
        } = res.data
  
        if (meta.status === 200) {
  
          this.total = res.data.data.total
  
          this.loading = false
  
          this.list = data.users
  
        }
  
      }
  
    },
  
    data() {
  
      return {
  
        list: [],
  
        loading: false,
  
        currentPage: 10,
  
        pagesize: 10,
  
        total: 10,
  
        pagenum: 1,
  
        searchVal: '',
  
        dialogFormVisibleAdduser: false,
  
  
  
        formdata: {
  
          username: '',
  
          password: '',
  
          email: '',
  
          mobile: '',
  
        },
  
        formLabelWidth: '140',
  
        dialogFormVisibleEdituser: false,
  
        dialogFormVisibleRouerUser: false,
  
        currUserName: '',
  
  
  
        currRoleId: -1,
  
  
  
        roles: [],
  
      }
  
  
  
    }
  
  }
</script>
<style>
  .box-card {
  
    height: 100%;
  
  }
  
  
  
  .searchArea {
  
    margin-top: 10px;
  
    margin-bottom: 10px;
  
  }
  
  
  
  .searchArea .searchInput {
  
    width: 350px;
  
  }
</style>

