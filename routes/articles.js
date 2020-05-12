var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/',async function(req, res, next) {
    
    /* promise 的寫法(function 前面不用加async) */
    // models.Article.findAll().then(articles => {
    //     res.json( {articles:articles} );
    // })

    /* async 的寫法 */
    var articles = await models.Article.findAll();
    res.json( {articles:articles} );
});


/* POST */
router.post('/create',async function(req,res,next){
    res.json( {"您傳送的數據為":req.body} );
    var article = await models.Article.create(req.body)
    res.json( {article:article} );
})

/* GET */
router.get('/:id',async function(req,res,next){
    var article = await models.Article.findByPk(req.params.id);
    res.json( {article:article} );
})

/* PUT */
router.put('/:id',async function(req,res,next){
    var article = await models.Article.findByPk(req.params.id);
    article.update(req.body);
    res.json( {article:article} );
})

/* DELATE */
router.delete('/delete/:id',async function(req,res,next){
    var article = await models.Article.destroy({
        where: {
          id: req.params.id
        }
      });
    res.json( {mesg:'刪除文章'+req.params.id } );
})


module.exports = router;
