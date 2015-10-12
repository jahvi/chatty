/* global angular */

angular.module('chatty')
    .controller('Chat', function($scope, $http, channelManager) {
        this.username = '';

        $http.get('messages').success(function(messages) {
            this.messages = messages;
        }.bind(this));

        var channel = channelManager.subscribe('chat_channel');

        channel.bind('Chatty\\Events\\MessagePublished', function(response) {
            this.messages.push(response.message);
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
            this.username = this.tpmUsername;
        };
    });