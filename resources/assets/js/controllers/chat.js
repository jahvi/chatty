/* global angular */

angular.module('chatty')
    .controller('Chat', function($http) {
        $http.get('messages').success(function(messages) {
            this.messages = messages;
        }.bind(this));

        this.sendMessage = function() {
            var message = {
                username: 'test',
                message: this.message
            };
            this.messages.push(message);
            this.message = '';
        };
    });