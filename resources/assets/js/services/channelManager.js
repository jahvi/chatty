/* global angular, Pusher, chattyConfig */

angular.module('chatty')
    .factory('channelManager', channelManager);

function channelManager($pusher, $sessionStorage) {
    return {
        subscribe(channelName) {
            let client = new Pusher(chattyConfig.PUSHER_KEY, {
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

            let pusher = $pusher(client);
            this.channel = pusher.subscribe(channelName);

            return this.channel;
        },
        getMembersCount() {
            return this.channel.members.count;
        }
    };
}
