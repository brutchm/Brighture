
import axios from "axios";

// const baseUrl ="https://brighturewebservices.azurewebsites.net/api/";




// export function postUsuario(idUser, nombreUsuario, apellidoUnoUser, apellidoDosUser, fechaNacimientoUser, correoElectronicoUser,contrasennaUnoUser){
//   console.log("post usuario"+idUser)
//   const body={
//     id:idUser,
//     nombre: nombreUsuario,
//     apellidoUno:apellidoUnoUser,
//     apellidoDos: apellidoDosUser,
//     fechaNacimiento:fechaNacimientoUser,
//     correoElectronico:correoElectronicoUser,
//     contrasenna:contrasennaUnoUser
//   }

//   axios.post(baseUrl+"Usuario"+body).then(response =>{
//     console.log(response.data)
//   }).catch(err => {console.log(err)})

 
// }

// const instance = axios.create({
//   baseURL: 'https://localhost:4001/api',
//   headers: {
//       'content-type':'application/octet-stream',
//       'x-rapidapi-host':'example.com',
//       'x-rapidapi-key': process.env.RAPIDAPI_KEY
//   },
// });

// export function postUsuario(idUser, nombreUsuario, apellidoUnoUser, apellidoDosUser, fechaNacimientoUser, correoElectronicoUser,contrasennaUnoUser){
//   console.log("post usuario"+idUser)
  
//   instance({
//       'method': 'POST',
//       'url':'/Usuario',
//       'data': {
//           'id':idUser,
//           'nombre': nombreUsuario,
//           'apellidoUno':apellidoUnoUser,
//           'apellidoDos': apellidoDosUser,
//           'fechaNacimiento':fechaNacimientoUser,
//           'correoElectronico':correoElectronicoUser,
//           'contrasenna':contrasennaUnoUser
//       }
//   })
// }
export function getListaUsuarios( callback) {
  axios({
    method: 'get',
    url: 'https://localhost:4001/api/Usuario'
  }).then((res) => {
    alert('trajo cosas');
    callback(res);
  }).catch((err) => {
    alert(err);
  })
}

