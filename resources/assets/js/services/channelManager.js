/* global angular, Pusher, chattyConfig */

angular.module('chatty')
    .factory('channelManager', function($pusher) {
        var channel;

        return {
            subscribe: function (channelName) {
                var client = new Pusher(chattyConfig.PUSHER_KEY, {
                    encrypted: true
                });

                var pusher = $pusher(client);
                channel = pusher.subscribe(channelName);

                return channel;
            },
            getMembers: function () {
                return channel.members;
            }
        };
    });