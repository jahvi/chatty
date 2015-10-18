/* global angular, Pusher, chattyConfig */

angular.module('chatty')
    .factory('channelManager', function($pusher, $sessionStorage) {
        var channel;

        return {
            subscribe: function (channelName) {
                var client = new Pusher(chattyConfig.PUSHER_KEY, {
                    encrypted: true,
                    auth: {
                        headers: {
                            'X-CSRF-Token': chattyConfig.token
                        },
                        params: {
                            username: $sessionStorage.username
                        }
                    }
                });

                var pusher = $pusher(client);
                channel = pusher.subscribe(channelName);

                return channel;
            },
            getMembersCount: function () {
                return channel.members.count;
            }
        };
    });