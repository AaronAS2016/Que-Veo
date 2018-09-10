let con = require('../lib/conexionbd');

const buscarInformacion = (req,res) =>{

  let {id} = req.params;

  const sql = `SELECT *
               FROM pelicula p 
               JOIN genero g ON p.genero_id = g.id 
               JOIN actor_pelicula ac ON p.id = ac.pelicula_id 
               JOIN actor a ON ac.actor_id = a.id 
               WHERE p.id = ${id}`
  con.query(sql, (error, resultado, fields) =>{
    if(error){
      console.log("Hubo un error en la consulta", error.message)
      return res.status(404).send("Hubo un error en la consulta")
    } 
    let response = {
      'pelicula': resultado[0],
      'actores' : resultado,
      'genero' : resultado[0]
    };  
    res.status(200).send(JSON.stringify(response))
  })
}


module.exports = {
  buscarInformacion
}