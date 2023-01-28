const generateMessage = (username, text, createdAt, id) => {
    return {
        username,
        text,
        createdAt,
        id
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