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
