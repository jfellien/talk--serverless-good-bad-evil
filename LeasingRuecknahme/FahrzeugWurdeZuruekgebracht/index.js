const guid = require('uuid/v4');

const IN_RUECKHANHME = "in ruecknahme";
const ZURUECKGEGEBEN = "zurueckgegeben";

const isValid = requestBody => {
    if(requestBody){
        return requestBody.kilometerstand != null
        && requestBody.tag_der_rueckgabe != null;
    }

    return false;
}

module.exports = async (context, req, anzahlRuecknahmenIn, fahrzeugIn) => {
    context.log('Triggered - Fahrzeug wurde zurückgebracht');

    let response_message = "";
    let status = 200;
    let fahrzeug = fahrzeugIn.length == 1 ? fahrzeugIn[0] : null;

    if(isValid(req.body) 
    && fahrzeug != null
    && fahrzeug.status != IN_RUECKHANHME
    && fahrzeug.status != ZURUECKGEGEBEN){

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

        context.bindings.ruecknahme = ruecknahme;

        context.bindings.fahrzeugOut = {
            id : fahrzeug.id,
            ruecknahme_id: ruecknahme.id,
            document_type : "fahrzeug",
            status: IN_RUECKHANHME,
            data : fahrzeug.data
        }
        
        context.bindings.anzahlRuecknahmenOut = {
            id : mitarbeiter_nummer,
            document_type : "counter",
            count : anzahlRuecknahmen
        }

        response_message = `Rücknahme wurde mit der ID ${ ruecknahme.id } erfasst`;
    }
    else{
        status = 400;
        response_message = "Falsche Daten in der Rückgabe oder Fahrzeug noch nicht verfügbar";
    }
    
    context.res = {
        status: status,
        body: response_message
    };
};