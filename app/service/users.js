const Service = require('egg').Service;

class UsersService extends Service {
  // implement
  async findAll() {
    const user = await this.app.mysql.select('user');
    return { user };
  }
  async findOne(uid) {
    const user = await this.app.mysql.get('user', { user_id: uid });
    return { user };
  }
  async add(params) {
    const date = new Date();
    const result = await this.app.mysql.insert('user', { user_name: params.name, user_pwd: params.pwd, user_sex: params.sex, user_role: params.role, user_createdate: date });
    return { result };
  }
  async delete(uid) {
    const result = await this.app.mysql.delete('user', {
      user_id: uid,
    });
    return { result };
  }
  async update(params) {
    // 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
    const options = {
      where: {
        user_id: params.id
      }
    };
    const row = {
      user_name: params.name,
      user_createdate: new Date(),
    };
    const result = await this.app.mysql.update('user', row, options); 
    return { result };
  }
}

module.exports = UsersService;
