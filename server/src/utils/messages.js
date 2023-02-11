const generateMessage = (username, body, createdAt, id, type, fileName) => {
    return {
        username,
        body,
        createdAt,
        id,
        type,
        fileName
    }
}   

// const generateLocationMessage = (username, url) => {
//     return {
//         username,
//         url,
//         createdAt: new Date().getTime()
//     }
// }   

module.exports = {
    generateMessage,
    // generateLocationMessage
}