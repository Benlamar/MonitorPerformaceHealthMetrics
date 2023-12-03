const { insertData } = require('./controller/controller')

function handleConnection(socket, io) {
    socket.on('device', (data) => {
        const response = {
            status: 'Success',
            message: 'Data received successfully',
            data: data
        };
        console.log(data);
        // Emit the response to all client
        insertData(data);
        io.emit('deviceResponse', response);
    });
}

module.exports = { handleConnection }