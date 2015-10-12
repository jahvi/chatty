/* global angular, Pusher, chattyConfig */

angular.module('chatty')
    .factory('channelManager', function($pusher) {
        var channel;

        return {
            subscribe: function (channelName) {
                var client = new Pusher(chattyConfig.PUSHER_KEY, {
                    encrypted: true,
                    auth: {
                        headers: {
                            'X-CSRF-Token': chattyConfig.token
                        }
                    }
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