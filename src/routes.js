const express = require('express');
const multer = require('multer');

const routes = new express.Router();
const upload = multer();
const ProdutoController = require('./controller/ProdutoControler');

routes.get('/',ProdutoController.index );
routes.get('/produtos',ProdutoController.index );
routes.post('/store', upload.none() ,ProdutoController.store );
// routes.get('/edit/:id',ProdutoController.edit );
// routes.get('/destroy/:id',ProdutoController.destroy );

// routes.post('/destroy',ProdutoController.update );
// routes.post('/edit',ProdutoController.delete );


 routes.post('/atualizaEstoque/:id/addProduto', upload.none(), ProdutoController.atualizaEstoque );
 routes.post('/atualizaEstoque/:id/subProduto', upload.none(), ProdutoController.atualizaEstoque );

module.exports = routes;