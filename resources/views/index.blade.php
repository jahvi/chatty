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

        <form ng-submit="chat.sendMessage()">
            <div class="input-group">
                <input class="form-control" placeholder="Message" ng-model="chat.message" autofocus required>
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="button">Send</button>
                </span>
            </div>
        </form>
    </div>

    <script src="/js/all.js"></script>
</body>
</html>
