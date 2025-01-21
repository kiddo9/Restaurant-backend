module.exports = function GenerateId(length) {
    let IdNumber = '1234567890';
    let IdGenerated = '';

    for(let i = 0; i < length; i++){
        let Id = Math.floor(Math.random() * IdNumber.length);
        IdGenerated += IdNumber[Id]
    }

    return IdGenerated
}