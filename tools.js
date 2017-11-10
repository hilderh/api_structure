var cb = {
    error: false,
    message: ''
};
const validateEmpty = (data)=>{
    let iterador = Object.entries(data);
    const resp = iterador.map((x)=>{
        if(x[1]==null||x[1]== ''){
            cb.error = true;
            cb.message = 'Null or empty fields'
        };
        if(x[0] == 'id'){
            cb.error = true;
            cb.message = 'The id field is not operable in this service'
        }
    })
    return cb;
}
const validateKeys = (keysModel,request)=>{
    const array = keysModel.map((r)=>Object.keys(request).indexOf(r)!=(-1)),
    error = array.some(r=>r===false);
    const index = array.findIndex((each,i)=>!each);
    if(error){
        cb.error = error,
        cb.message = `These fields are required in the request ${keysModel}`
    }
    return cb;
}


export {validateEmpty,validateKeys}; 