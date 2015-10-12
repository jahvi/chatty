<!doctype html>
<html ng-app="chatty">
<head>
    <meta charset="utf-8">
    <title>Chatty | A sample chat app built with Laravel, Pusher and AngularJS</title>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <div class="container" ng-controller="Chat as chat">
        <div class="ui stackable padded grid">
            <aside class="three wide column info-column">
                <h1>Chatty</h1>
                <p>
                    Sample chat app build with Laravel, Pusher and AngularJS.
                </p>
                <p>
                    There's a lot of room for improvement so feel free to submit pull requests.
                </p>
                <div class="ui large horizontal divided list">
                    <div class="item">
                        <div class="content">
                            <a href="https://twitter.com/jahvi"><i class="twitter icon"></i> jahvi</a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="content">
                            <a href="#"><i class="github icon"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            </aside>

            <div class="ten wide column chat-column">
                <h2 class="ui header">
                    <i class="comments outline icon"></i>
                    <div class="content">
                        Chat Room
                        <div class="sub header">
                            <small ng-show="chat.memberCount" ng-cloak>
                                Online: @{{ chat.memberCount }}
                            </small>
                        </div>
                    </div>
                </h2>

                <div class="ui comments" ng-cloak>
                    <div class="comment" ng-repeat="message in chat.messages">
                        <div class="avatar">
                            <img src="http://placehold.it/50x50">
                        </div>
                        <div class="content">
                            <span class="author">@{{ message.username }}</span>
                            <div class="metadata">
                                <div class="date">1 day ago</div>
                            </div>
                            <div class="text">
                                <p>@{{ message.message }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chat-actions">
                    <form ng-hide="chat.username" ng-submit="chat.setUsername()">
                        <div class="ui fluid action input">
                            <input placeholder="Your display name" ng-model="chat.tpmUsername" autofocus required>
                            <button class="ui button">Set</button>
                        </div>
                    </form>

                    <form ng-show="chat.username" ng-submit="chat.sendMessage()" ng-cloak>
                        <div class="ui labeled fluid action input">
                            <div class="ui label">
                                @{{ chat.username }} says:
                            </div>
                            <input placeholder="Message" ng-model="chat.message" required>
                            <button class="blue ui button">Send</button>
                        </div>
                    </form>
                </div>
            </div>

            <aside class="three wide column users-column">
                <h3>TODO: User list</h3>
            </aside>
        </div>
    </div>

    <script>
        var chattyConfig = {
            token: "{{ csrf_token() }}",
            PUSHER_KEY: "{{ config('broadcasting.connections.pusher.key') }}"
        };
    </script>
    <script src="/js/all.js"></script>
</body>
</html>
