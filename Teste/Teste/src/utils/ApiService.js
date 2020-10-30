const ApiService = {

    ListaCarros : () =>{
        return fetch('http://localhost:8000/api/carros')
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());
    },
    CriaCarros : carros => {
        return fetch('http://localhost:8000/api/carros', {method: 'POST', headers: {'content-type': 'application/json'}, body: carros})
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());;
    },
    ListaNomes: () =>{
        return fetch('http://localhost:8000/api/carros/nome')
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());;
    },
    ListaAno: () => {
        return fetch('http://localhost:8000/api/carros/ano')
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());;
    },
    RemoveCarros: id => {
        return fetch(`http://localhost:8000/api/carros/${id}`, {method: 'DELETE', headers: { 'content-type' : 'application/json'},})
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());;
    },
    EditarCarros: id => {
        return fetch (`http://localhost:8000/api/carros/${id}`, {method: 'EDITAR', headers: { 'content-type' : 'application/json'},})
        .then(res => ApiService.TrataErros(res))
        .then(res => res.json());
    },
    TrataErros : res =>{
        if(!res.ok){
            
            throw Error(res.responseText);
        }
        return res;
    } 

}
export default ApiService;