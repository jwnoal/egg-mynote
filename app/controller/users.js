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
