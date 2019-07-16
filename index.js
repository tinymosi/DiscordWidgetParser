// importing local json
const fs = require('fs');
let rawdata = fs.readFileSync('discord.json');
let json = JSON.parse(rawdata);

// function for shortest console logging
var log = function (message) {
    console.log(message);
}

// actual code begins here
var channels = json.channels;
var members = json.members;
const serverName = json.name;

var inRoom = [];
var notInRoom = [];

// return status emoji of a user
var getStarus = function (user) {
    if (user.game !== undefined) {
        if (user.game.name == 'Spotify') {
            return ('🎶 ')
        } else {
            return ('🤖 ')
        }
    }
    
    switch (user.status) {
        case 'online':
            return('💚 ');
        case 'idle':
            return('💛 ');
        case 'dnd':
            return('❤️ ');
        default:
            return('🤔 ')
    }
}

// return a string with a game that user is laying right now
var getGame = function(user) {
    if (user.game !== undefined) {
        switch (user.game.name) {
            case 'Counter-Strice: Global Offensive':
                return (' играет в CS:GO');
            case "PLAYERUNKNOWN'S BATTLEGROUNDS":
                return (' играет в PUBG');
            case 'Spotify':
                return (' слушает ' + user.game.name)
            default:
                return (' играет в ' + user.game.name);
        }
    } else return('');
}

// return emoji if user is deafed
var getDeaf = function(user) {
    if (user.deaf !== undefined || user.self_deaf !== undefined) {
        if (user.deaf == true) {
            return ('🔇');
        } else if (user.self_deaf == true) {
            return ('🙉');
        } else return('');
    } else return('');
}

// return emoji if user is muted
var getMute = function(user) {
    if (user.mute !== undefined || user.self_mute !== undefined) {
        if (user.mute == true) {
            return ('🤐');
        } else if (user.self_mute == true) {
            return ('🙊');
        } else return('');
    } else return ('');
}

// return full info about user
var getUserInfo = function(user) {
    let member ='';
    if (user.nick !== undefined) {
        return member += getDeaf(user) + getMute(user) + getStarus(user) + user.nick + ' (' + user.username + ')' + getGame(user)
    } else {
        return member += getDeaf(user) + getMute(user) + getStarus(user) + user.username + getGame(user)
    }
}

// split all the members in two arrays.
// inRoom - contains all of the users that in a voice chat room right now.
// notInRoom - contains the rest of users that are online but not in any voice chat room.
for (member of members) {
    var memberId = member.channel_id;
    if (memberId == undefined) {
        notInRoom.push(member);
    } else {
        inRoom.push(member);
    }
}

log('Arrays counter:')
log('inRoom: ' + inRoom);
log('notInRoom: ' + notInRoom);
log('---')

// getting an array of users in rooms
var roomsContent = [];
for (channel of channels) {
    var channelId = channel.id;
    var room = [];

    for (user of inRoom) {
        var memberId = user.channel_id;

        if (channelId == memberId) {
            room.push(getUserInfo(user));
        }
    }

    if (room.length != 0) {
        room.unshift(channel.name, '---');
        room.push('\n');
        roomsContent.push(room)
    }
}

// getting an array of users that not in any room
var onlineUsers = [];
for (user of notInRoom) {
    onlineUsers.push(getUserInfo(user)); // here you'll get all the needed information about user. It's just a username for now as a proof of concept.
}

// log to console content of an arrays of users in rooms
log('In rooms:')
for (item of roomsContent) {
    log(item);
}
log('------')
// log to console content of an arrays of users not in rooms
log('Not in any room:')
log(onlineUsers.join(', '))