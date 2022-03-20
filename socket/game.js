const { Socket } = require('socket.io');
const {getIO } = require('./init');

console.log('Init IO')
getIO().on("connection", (socket) => {
    console.log('Connection Received', socket.id)
    initListeners(socket)
});

/**
 * @param {Socket} socket
 */
function initListeners(socket){
    userDetailsUpdateListener(socket);
    challengeListener(socket)
    getAllPlayersListener(socket)
}

/**
 * @param {Socket} socket
 */
 function userDetailsUpdateListener(socket){
    socket.on('update-my-details', (data) => {
        socket.data.user = data;
    })
}


/**
 * @param {Socket} socket
 */
function challengeListener(socket){
    socket.on('challenge-player', (data) => {
        challengePlayer(data)
    })
    socket.on('challenge-response', (data) => {
        challengePlayerResponse(data)
    })
    socket.on('challenge-sudoku-puzzle', (data) => {
        challengeSendPuzzle(data)
    })
    socket.on('challenge-opponent-status', (data) => {
        challengeSendOpponentStatus(data)
    })
    socket.on('challenge-opponent-quit', (data) => {
        challengeSendOpponentQuit(data)
    })
    socket.on('challenge-game-over', (data) => {
        challengeGameOver(data)
    })
    socket.on('challenge-rematch', (data) => {
        challengeRematch(data)
    })
    socket.on('challenge-rematch-response', (data) => {
        challengeRematchResponse(data)
    })
    socket.on('challenge-sudoku-puzzle-rematch', (data) => {
        challengeSudokuPuzzleRematch(data)
    })
    socket.on('challenge-sudoku-gameover-result', (data) => {
        console.log('challenge-sudoku-gameover-result', data)
        sendSudokuGameOverResult(data)
    })
}

/**
 * @param {Socket} socket
 */
 function challengePlayer(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-player', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeGameOver(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-game-over', {...data})
    } catch (error) {
    }
}


/**
 * @param {Socket} socket
 */
 function sendSudokuGameOverResult(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-sudoku-gameover-result', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeSudokuPuzzleRematch(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-sudoku-puzzle-rematch', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeRematch(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-rematch', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeRematchResponse(data){
    try {
    const socket = getIO().sockets.sockets.get(data.to.id);
    socket.emit('challenge-rematch-response', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengePlayerResponse(data){
    try {
        const socket = getIO().sockets.sockets.get(data.to.id);
        socket.emit('challenge-response', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeSendPuzzle(data){
    try {
        const socket = getIO().sockets.sockets.get(data.to.id);
        socket.emit('challenge-sudoku-puzzle', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeSendOpponentStatus(data){
    try {
        const socket = getIO().sockets.sockets.get(data.to.id);
        socket.emit('challenge-opponent-status', {...data})
    } catch (error) {
    }
}

/**
 * @param {Socket} socket
 */
 function challengeSendOpponentQuit(data){
    try {
        const socket = getIO().sockets.sockets.get(data.to.id);
        socket.emit('challenge-opponent-quit', {...data})
    } catch (error) {
        
    }
}


/**
 * @param {Socket} socket
 */
function getAllPlayersListener(socket){
    socket.on('get-all-players', (data) => {
        let users = getIO().sockets.sockets.values();
        users = [...users].map(item=>({...item.data.user, id: item.id}))
        users = [...users].filter(item=>{return item && item.name})
        try {
            socket.emit('all-players', users)
        } catch (error) {
        }
    })
}

module.exports = getIO();