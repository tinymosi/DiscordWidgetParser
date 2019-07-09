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

log(notInRoom);
log(inRoom);

// delimiter
log('---')
log('In rooms:')

// getting an array of users in rooms
var roomsContent = [];
for (channel of channels) {
    var channelId = channel.id;
    var room = [];

    for (user of inRoom) {
        var memberId = user.channel_id;

        if (channelId == memberId) {
            room.push(user.username); // here you'll get all the needed information about user. It's just a username for now as a proof of concept.
        }
    }

    if (room.length != 0) {
        room.unshift(channel.name, '---');
        roomsContent.push(room)
    }
}

// log to console contet of an arrays of users in rooms
for (item of roomsContent) {
    log(item);
}


// getting an array of users that not in any room
var onlineUsers = [];
for (user of notInRoom) {
    onlineUsers.push(user.username); // here you'll get all the needed information about user. It's just a username for now as a proof of concept.
}

// delimiter
log('------')
log('Not in any room:')

// log to console contet of an arrays of users not in rooms
log(onlineUsers)
