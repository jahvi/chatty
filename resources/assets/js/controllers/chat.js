/* global angular */

angular.module('chatty')
    .controller('Chat', function() {
        this.messages = [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            'Ab error doloremque distinctio similique consequatur facere'
        ];

        this.sendMessage = function() {
            this.messages.push(this.message);
            this.message = '';
        };
    });