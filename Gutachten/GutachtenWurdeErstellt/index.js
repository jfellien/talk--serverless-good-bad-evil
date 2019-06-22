const guid = require('uuid/v4');

const isValid = requestBody => {
    if(requestBody){
        return requestBody.gutachten != null;
    }

    return false;
}

module.exports = async function (context, req, gutachtenAnfrage) {
    context.log('Triggered - Gutachentenanfrage wurde beantwortet');

    let response_message = "";
    let status = 200;

    if(isValid(req.body)){

        let rueckgabe_gutachten = {
            id : guid(),
            document_type : "rueckgabe_gutachten",
            data : req.body.gutachten
        };

        rueckgabe_gutachten.gutachten.rueckgabe_nummer = gutachtenAnfrage.data.ruecknahme_nummer;

        context.bindings.gutachten = rueckgabe_gutachten;

        response_message = "Gutachten wurde gesichert";
    }
    else
    {
        status = 400;
        response_message = "Gutachten konnte nicht gesichert werden";
    }

    context.res = {
        status: status,
        body: response_message
    };
    
};