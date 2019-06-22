const guid = require('uuid/v4');

const isValid = requestBody => {
    if(requestBody){
        return requestBody.kilometerstand != null
        && requestBody.tag_der_rueckgabe != null;
    }

    return false;
}

module.exports = async (context, req, anzahlRuecknahmenIn) => {
    context.log('Triggered - Fahrzeug wurde zurückgebracht');

    /// Zu dem Kennzeichen wird noch der Vertrag benötigt
    /// und es muss sichergestellt werden, dass nur eine Rücknahme je Fahrzeug erfolgt.

    let response_message = "";
    let status = 200;

    if(isValid(req.body)){

        let anzahlRuecknahmen = anzahlRuecknahmenIn.length == 0 ? 1 : anzahlRuecknahmenIn[0].count + 1;
        let tag_der_rueckgabe = req.body.tag_der_rueckgabe;
        let mitarbeiter_nummer = req.body.mitarbeiter_nummer;

        let ruecknahme = {
            id : guid(),
            document_type : "ruecknahme",
            status : "rueckname begonnen",
            data : {
                ruecknahme_nummer : `${ mitarbeiter_nummer }-${ anzahlRuecknahmen }-${ tag_der_rueckgabe }`,
                kilometerstand : req.body.kilometerstand,
                tag_der_rueckgabe : tag_der_rueckgabe
            } 
        };

        context.bindings.anzahlRuecknahmenOut = {
            id : mitarbeiter_nummer,
            document_type : "counter",
            count : anzahlRuecknahmen
        }

        context.bindings.ruecknahme = ruecknahme;

        response_message = `Rücknahme wurde mit der ID ${ ruecknahme.id } erfasst`;
    }
    else{
        status = 400;
        response_message = "Falsche Daten in der Rückgabe";
    }
    
    context.res = {
        status: status,
        body: response_message
    };

};