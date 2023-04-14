window.addEventListener('load', function () {
    var status = document.getElementById('status');
    var icon = document.getElementById('icon');
    var text = document.getElementById('text');

    function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";
        if (condition === "online") {
            icon.src = "online.png";
            text.textContent = "Connected";
        } else {
            icon.src = "offline.png";
            text.textContent = "No Internet Connection";
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
