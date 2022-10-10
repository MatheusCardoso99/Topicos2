import axios from "./axios-common";
class UsuarioSrv {
 url = "/usuarios";
 async listar() {
 return await axios.get(this.url).catch(err => { throw err; });
 }
 async incluir(data) {
 return await axios.post(this.url, data).catch(err => { throw err; });
 }
}
export default new UsuarioSrv();