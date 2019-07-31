const Produto = require('../models/Poduto');

module.exports ={
    async index(req, res){
        var produto = await  Produto.find().sort('-nome');
        var r =JSON.parse(JSON.stringify(produto));
       
       
        return res.json(r);
    },

    async store(req, res){
        var date = new Date();
        const {nome, quantidade, unidade , createdAt = date, updatedAt = date} = req.body;

        const produto = await  Produto.create({
            nome,
            quantidade,
            unidade,
            createdAt,
            updatedAt
        });

         req.io.emit('post',produto);

        return res.json(produto);
    },

    async edit(req, res){
        const produto = await  Produto.findById(req.params.id);
        return res.json(produto);
    },

    async update(req, res){
        const produto = await  Produto.findById(req.params.id);
        const {nome, quantidade, unidade} = req.body;

        produto = await  Produto.update({
            nome,
            quantidade,
            unidade
        });

         req.io.emit('produtoAlterado',produto);

        return res.json(produto);
    },

    async atualizaEstoque(req, res){
        const prod = await  Produto.findById(req.params.id);
        var date = new Date();
        prod.updatedAt = date;

        url = req.url.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
        url = url.pop();

        var { quantidade } = req.body;
        quantidade =  parseInt(quantidade);

        if(url=='addProduto'){
            prod.quantidade += quantidade;
            //  await prod.save();
            req.io.emit('adicionado', prod);
        }
        else{
            prod.quantidade -= quantidade;
            
            req.io.emit('removido', prod);
        }
       

         await prod.save();
         var r =JSON.parse(JSON.stringify(prod));
        //  r.forEach(element => {
        //      var now = new Date(element.updatedAt);
        //      var date = now.toLocaleDateString('en-GB');
        //      var time = now.toLocaleTimeString();
        //      element.data = date;
        //      element.hora = time;
        //  });
        
         return res.json(r);

        // return res.json(prod);
    }

}