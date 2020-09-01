

let productsController = {
   index: function(req, res) {
        let listaDeProductos = [
            { 
                nombre: 'remera',
                precio: 2000
            },
            {
                nombre: 'pantalón',
                precio: 2100,
            },
            {
                nombre: 'camisa',
                precio: 2190,
            },
            {
                nombre: 'medias',
                precio: 2200,
            },
            {
                nombre: 'zapatillas',
                precio: 2200,
            },
        ];   

        return res.render('products', { listaDeProductos });
    },
    show: function(req, res){
        return res.render('detail');
    },

}

module.exports = productsController;