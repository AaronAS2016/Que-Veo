let con = require('../lib/conexionbd');

const buscarRecomendacion = (req,res) =>{
  let sql = armarQuery(req.query);
  con.query(sql, (error, resultado, fields) =>{
    if(error){
      console.log("Hubo un error en la consulta", error.message)
      return res.status(404).send("Hubo un error en la consulta")
    }

    let response = {
      'peliculas' : resultado
    
    }
    res.status(200).send(response)
  })
}

const armarQuery = req => {
  let {genero, anio_inicio, anio_fin, puntuacion, duracion} = req;

  let peticionBase = `SELECT P.id, titulo, poster, trama, g.nombre FROM pelicula p JOIN genero g ON p.genero_id = g.id WHERE`;

  if(genero)
    peticionBase+= ` g.nombre ='${genero}' AND`

  if(anio_inicio || anio_fin)
      peticionBase+= ` p.anio BETWEEN ${anio_inicio} AND ${anio_fin} AND`

  if(duracion)
      peticionBase+= ` p.duracion <= ${duracion} AND`

  if(puntuacion != undefined)
      peticionBase += ` p.puntuacion >= ${puntuacion} AND`

  peticionBase = peticionBase.slice(0,-4);
  

  return peticionBase;
  
}

module.exports = {
  buscarRecomendacion
}