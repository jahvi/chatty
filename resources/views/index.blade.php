<!doctype html>
<html ng-app="chatty">
<head>
    <meta charset="utf-8">
    <title>Chatty</title>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <div class="container" ng-controller="Chat as chat">
        <h1>Chatty</h1>

        <hr>

        <ul class="messages-list" ng-cloak>
            <li ng-repeat="message in chat.messages">
                <strong>@{{ message.username }}</strong>:
                @{{ message.message }}
            </li>
        </ul>

        <form ng-hide="chat.username" ng-submit="chat.setUsername()">
            <div class="input-group">
                <input class="form-control" placeholder="Your username" ng-model="chat.tpmUsername" autofocus required>
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">Set</button>
                </span>
            </div>
        </form>

        <form ng-show="chat.username" ng-submit="chat.sendMessage()" ng-cloak>
            <div class="input-group">
                <span class="input-group-addon" id="sizing-addon1">
                    @{{ chat.username }} says:
                </span>
                <input class="form-control" placeholder="Message" ng-model="chat.message" required>
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">Send</button>
                </span>
            </div>
        </form>
    </div>

    <script src="/js/all.js"></script>
</body>
</html>
