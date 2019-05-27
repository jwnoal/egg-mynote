# egg-mynote



## 快速生成项目

```
npm init egg --type=simple
```

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

## 运行

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
## 安装 egg-mysql
```
npm i --save egg-mysql
```
#### 配置config
```
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'noal',
      // 密码
      password: '123456',
      // 数据库名
      database: 'noal',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.jwt = {
    secret: '156065' //自己设置的值
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553490106439_8818';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

```
#### 配置plugin.js
```
'use strict';

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```
#### 编写路由
router.js
```
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  require('./router/api/users')(app);
};

```
创建具体路由router/api/users.js
```
module.exports = app => {
  const { router, controller } = app;
  router.prefix('/api/users')
  router.get('/', controller.users.index);
  router.get('/findall', controller.users.findAll);
  router.get('/findone/:id', controller.users.findOne);
  router.post('/add', controller.users.add);
  router.delete('/delete/:id', controller.users.delete);
  router.put('/update', controller.users.update);
};
```
#### 编写控制器controller/users.js
```
'use strict';

const Controller = require('egg').Controller;

class usersController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async findAll() {
    const data = await this.service.users.findAll();
    this.ctx.body = data;
  }
  async findOne() {
    const id = this.ctx.params.id;
    const data = await this.service.users.findOne(id);
    this.ctx.body = data;
  }
  async add() {
    const params = this.ctx.request.body;
    const data = await this.service.users.add(params);
    this.ctx.body = data;
  }
  async delete() {
    const id = this.ctx.params.id;
    const data = await this.service.users.delete(id);
    this.ctx.body = data;
  }
  async update() {
    console.log(this.ctx.request.body)
    const data = await this.service.users.update(this.ctx.request.body);
    this.ctx.body = data;
  }
}

module.exports = usersController;

```
#### 编写业务代码 service/users.js
```
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
```
## 请求接口
![find](https://jwnoal.github.io/images/egg-findall.jpg)
![find](https://jwnoal.github.io/images/egg-findone.jpg)
![find](https://jwnoal.github.io/images/egg-add.jpg)
![find](https://jwnoal.github.io/images/egg-update.jpg)
![find](https://jwnoal.github.io/images/egg-delete.jpg)