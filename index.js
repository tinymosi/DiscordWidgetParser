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

// for (channel of channels) {
//     var channelId = channel.id;

//     for (member of members) {
//         var memberId = member.channel_id;

//         if (channelId == memberId) {
//             inRoom.push(member);
//         }
//     }
// }






