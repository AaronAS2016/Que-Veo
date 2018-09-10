let con = require('../lib/conexionbd');



const buscarPeliculas = (req,res) =>{

  const peticionBase = `SELECT * from pelicula`

  let peticionPaginacion = 'select count(*) as total from pelicula';

  let sql = armarQuery(req, peticionBase)

  let sqlTotal = armarQuery(req, peticionPaginacion, false)


  con.query(sqlTotal, (error, resultado, fields) =>{
    if(error){
      console.log("Hubo un error en la consulta", error.message)
      return res.status(404).send("Hubo un error en la consulta")
    }
    var totalPelis = resultado[0].total;
    if(totalPelis != 0){
      con.query(sql, function(error, respuestaPeliculas){
			
        if(error){
          return res.status(500).send("ERROR AL BUSCAR DATOS DE CADA PELICULA"); //  ((error)Code, errorLog)
        }
        let response = {
          'peliculas': respuestaPeliculas,
          'total': totalPelis
        }  

        res.status(200).send(JSON.stringify(response))
      })
    }else{
      return res.status(404).send("Hubo un error en la consulta")
    }

  })
}

const buscarGeneros = (req, res) =>{
  const sql = "SELECT * from genero"
  con.query(sql, (error, resultado, fields) =>{
    if(error){
      console.log("Hubo un error en la consulta", error.message)
      return res.status(404).send("Hubo un error en la consulta")
    }
    let response = {
      'generos': resultado
    };
    res.status(200).send(JSON.stringify(response))

  })
}


const armarQuery = (req, peticionBase, orden = true) => {
  let {anio,titulo, genero, columna_orden, tipo_orden, pagina, cantidad }  = req.query;

  let peticionFiltro = '';
  if(orden){
    peticionFiltro = `ORDER BY ${columna_orden} ${tipo_orden} LIMIT ${(pagina-1) * cantidad}, ${cantidad}`;
  }

  let peticionBusqueda = "";

  if(anio || titulo|| genero){
    peticionBusqueda += "WHERE ";
    if(anio)
      peticionBusqueda+= `anio = ${anio} AND `

    if(titulo)
      peticionBusqueda+= `titulo LIKE '${titulo}' AND `
    

    if(genero)
      peticionBusqueda+= `genero_id = ${genero} AND `

    peticionBusqueda = peticionBusqueda.slice(0,-5);
  }

  const sql = `${peticionBase} ${peticionBusqueda} ${peticionFiltro}`

  return sql;

}


module.exports = {
  buscarPeliculas,
  buscarGeneros
}