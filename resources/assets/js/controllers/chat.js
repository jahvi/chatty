/* global angular */

angular.module('chatty')
    .controller('Chat', function($scope, $http, $sessionStorage, channelManager, focus) {
        this.sessionStorage = $sessionStorage;
        this.users = [];

        // Populate chat room with previous messages
        $http.get('messages').success(function(messages) {
            this.messages = messages;
        }.bind(this));

        // When the username is set bind channel events
        $scope.$watch('chat.username', function(newValue) {
            if (newValue !== undefined) {
                this.bindChannelEvents();
            }
        }.bind(this));

        /**
         * Publish new message to chat room
         *
         * @return {void}
         */
        this.sendMessage = function() {
            var message = {
                username: this.username,
                message: this.message
            };

            $http.post('messages', message);

            this.message = '';
        };

        /**
         * Save username in session storage for persistency
         *
         * @return {void}
         */
        this.setUsername = function() {
            this.username = $sessionStorage.username;
            focus('messageReady');
        };

        // Populate username in case it's already in session storage
        this.setUsername();

        /**
         * Bind pusher channel events
         *
         * @return {void}
         */
        this.bindChannelEvents = function() {
            var channel = channelManager.subscribe('presence-chat');

            channel.bind('Chatty\\Events\\MessagePublished', function(response) {
                this.messages.push(response.message);
            }.bind(this));

            channel.bind('pusher:subscription_succeeded', function(users) {
                this.memberCount = channelManager.getMembersCount();
                this.addUser(users.me);
            }.bind(this));

            channel.bind('pusher:member_added', function(user) {
                this.memberCount = channelManager.getMembersCount();
                this.addUser(user);
            }.bind(this));

            channel.bind('pusher:member_removed', function() {
                this.memberCount = channelManager.getMembersCount();
            }.bind(this));
        };

        /**
         * Add user to chat room
         *
         * @param {Object} user
         */
        this.addUser = function(user) {
            this.users.push({
                id: user.id,
                username: user.info.username
            });
        };
    });