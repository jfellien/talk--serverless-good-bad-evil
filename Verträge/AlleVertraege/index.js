module.exports = async (context, req, vertraege) => {
    
    let response_data = vertraege.map( v => ({
        id : v.id,
        vertrag : v.data
    }));

    context.res = {
        body: response_data
    };

}; 