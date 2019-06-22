const guid = require('uuid/v4');

const isValid = requestBody => {
    if(requestBody){

        return requestBody.vertragsnehmer != null
        && requestBody.vertragsnehmer.nachname != null
        && requestBody.vertragsnehmer.vorname != null;

        /// Und viele weitere Prüfungen
    } 

    return false;
};

module.exports = async (context, req) => {
    context.log('Triggered - Vertrag wurde unterzeichnet');
    context.log('A new Contract will stored');

    let response_message = "";
    let status = 200;
    
    if(isValid(req.body)){

        let vertrag = {
           id : guid(),
           document_type : "vertrag",
           data : req.body 
        };

        context.bindings.vertrag = vertrag;
        context.bindings.vertragWurdeUnterzeichnet = req.body;

        response_message = `Unterzeichneter Vertrag mit der ID : ${ vertrag.id } wurde abgespeichert`
    }
    else{

        status = 400;
        response_message = "Keine gültigen Vertragsdaten"
    }

    context.res = {
        status: status,
        body: response_message
    };
    
};