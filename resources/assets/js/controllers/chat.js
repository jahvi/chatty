/* global angular */

angular.module('chatty')
    .controller('Chat', ['$scope', '$http', '$sessionStorage', '$filter', 'channelManager', 'focus', chatController]);

function chatController($scope, $http, $sessionStorage, $filter, channelManager, focus) {
    this.sessionStorage = $sessionStorage;
    this.users = [];

    // Populate chat room with previous messages
    $http.get('messages').success((messages) => {
        this.messages = messages;
    });

    // When the username is set bind channel events
    $scope.$watch('chat.username', (newValue) => {
        if (newValue !== undefined) {
            this.bindChannelEvents();
        }
    });

    /**
     * Publish new message to chat room
     *
     * @return {void}
     */
    this.sendMessage = () => {
        var message = {
            username: this.username,
            message: this.message
        };

        // Update message list for author
        this.messages.push(message);

        $http.post('messages', message);

        this.message = '';
    };

    /**
     * Save username in session storage for persistency
     *
     * @return {void}
     */
    this.setUsername = () => {
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
    this.bindChannelEvents = () => {
        let channel = channelManager.subscribe('presence-chat');

        channel.bind('Chatty\\Events\\MessagePublished', (response) => {
            // Update message list for everyone except the message author
            if (response.message.username !== this.username) {
                this.messages.push(response.message);
            }
        });

        channel.bind('pusher:subscription_succeeded', (users) => {
            this.memberCount = channelManager.getMembersCount();
            this.updateUsers(users.members);
        });

        channel.bind('pusher:member_added', (user) => {
            this.memberCount = channelManager.getMembersCount();
            this.addUser(user);
        });

        channel.bind('pusher:member_removed', (user) => {
            this.memberCount = channelManager.getMembersCount();
            this.removeUser(user);
        });
    };

    /**
     * Add a single user to chat room
     *
     * @param {Object} user
     */
    this.addUser = (user) => {
        this.users.push({
            id: user.id,
            username: user.info.username
        });
    };

    /**
     * Update user list
     *
     * @param {Object} users
     */
    this.updateUsers = (users) => {
        this.users = [];

        angular.forEach(users, (value, key) => {
            this.users.push({
                id: key,
                username: value.username
            });
        });
    };

    /**
     * Remove user from chat room
     *
     * @param  {Object} user
     * @return {void}
     */
    this.removeUser = (user) => {
        this.users = $filter('filter')(this.users, { id: '!' + user.id });
    };
}