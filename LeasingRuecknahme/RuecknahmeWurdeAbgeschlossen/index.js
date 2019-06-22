module.exports = async function (context, req, ruecknahmeIn, fahrzeugIn) {
    context.log('Triggered - Rücknahme abgeschlossen');

    let response_message = "";
    let status = 200;
    let fahrzeug = fahrzeugIn.length == 1 ? fahrzeugIn[0] : null;

    if(ruecknahmeIn && fahrzeug)
    {
        context.bindings.ruecknahmeOut = {
            id: ruecknahmeIn.id,
            document_type: ruecknahmeIn.document_type,
            status: "ruecknahme abgeschlossen",
            data: ruecknahmeIn.data
        }

        context.bindings.fahrzeugOut = {
            id: fahrzeug.id,
            document_type: "fahrzeug",
            rueckgabe_id: fahrzeug.rueckgabe_id,
            status: "zurueckgegeben",
            data: fahrzeug.data
        }

        response_message = "Rücknahme erfolgreich abgeschlossen";
    }
    else 
    {
        response_message = "zur angegeben ID ist keine Rücknahme eingerichtet worden."
    }
    context.res = {
        status: status,
        body: response_message
    };
};