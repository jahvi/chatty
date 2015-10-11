/* global angular */

angular.module('chatty')
    .controller('Chat', function($scope, $http) {
        this.username = '';

        $http.get('messages').success(function(messages) {
            this.messages = messages;
        }.bind(this));

        this.sendMessage = function() {
            var message = {
                username: this.username,
                message: this.message
            };

            $http.post('messages', message);

            this.messages.push(message);
            this.message = '';
        };

        this.setUsername = function() {
            this.username = this.tpmUsername;
        };
    });