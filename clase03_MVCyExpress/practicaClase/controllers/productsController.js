let autos = require("../autos");

let productsController = {
  index: function(req, res){
      return res.send(autos.lista);
  }, 

  porMarca: function (req, res) {
    let marca = req.params.marca;
    let listaPorMarca = autos.porMarca(marca);

    if (listaPorMarca.length == 0) {
      return res.send("No hay autos para la marca: " + marca);
    } else {
      return res.send(listaPorMarca);
    }
  },

  porColor: function (req, res) {
    let color = req.params.color;
    let listaPorColor = autos.porColor(color);

    if (listaPorColor.length == 0) {
      return res.send("No hay autos para el color: " + color);
    } else {
      return res.send(listaPorColor);
    }
  },

};

module.exports = productsController