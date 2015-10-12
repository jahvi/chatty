/* global angular */

angular.module('chatty')
    .controller('Chat', function($scope, $http, $sessionStorage, channelManager) {
        this.sessionStorage = $sessionStorage;
        this.username = $sessionStorage.username;

        $http.get('messages').success(function(messages) {
            this.messages = messages;
        }.bind(this));

        var channel = channelManager.subscribe('presence-chat');

        channel.bind('Chatty\\Events\\MessagePublished', function(response) {
            this.messages.push(response.message);
        }.bind(this));

        channel.bind('pusher:subscription_succeeded', function(members) {
            this.memberCount = members.count;
        }.bind(this));

        channel.bind('pusher:member_added', function() {
            this.memberCount += 1;
        }.bind(this));

        channel.bind('pusher:member_removed', function() {
            this.memberCount -= 1;
        }.bind(this));

        this.sendMessage = function() {
            var message = {
                username: this.username,
                message: this.message
            };

            $http.post('messages', message);

            this.message = '';
        };

        this.setUsername = function() {
            this.username = $sessionStorage.username;
        };
    });