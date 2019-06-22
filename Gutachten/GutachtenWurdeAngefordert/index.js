const guid = require('uuid/v4');

const isValid = requestBody => {
    if(requestBody){
        return requestBody.ruecknahme_nummer != null
        && requestBody.ruecknahme_nummer != "";
    }

    return false;
}

module.exports = async (context, req) => {
    context.log('Triggered - Gutachtenanfrage gestellt');

    let response_message = "";
    let status = 200;
    
    if(isValid(req.body)){

        let gutachten_anfrage = {
            id : guid(),
            document_type : "gutachten_anfrage",
            data : req.body 
         };
 
         /// Neues Gutachtenanfrageobjekt an das CosmosDB Binding übergeben
         context.bindings.gutachtenAnfrage = gutachten_anfrage;

        response_message = `Gutachtenanfrage mit der ID ${ gutachten_anfrage.id } wurde gestellt`
    } 
    else {
        status = 400;
        response_message = "Keine gültigen Gutachtendaten"
    }

    context.res = {
        status: status,
        body: response_message
    };
};