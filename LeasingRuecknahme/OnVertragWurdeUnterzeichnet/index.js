const guid = require('uuid/v4');

module.exports = async function(context, unterzeichneterVertrag) {
    context.log('Triggered - Neuer Vertrag wurde unterzeichnet');

    context.bindings.fahrzeug = {
        id : guid(),
        document_type : "fahrzeug",
        status: "zur ruecknahme erfasst",
        data : {
            fahrzeug : unterzeichneterVertrag.fahrzeug
        }
    }
};