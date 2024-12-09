// Lấy dữ liệu từ localStorage (wsPort, targetWebsite) để gắn vào JS dưới
chrome.storage.local.get(["wsPort", "targetWebsite"], (result) => {
    const wsPort = result.wsPort || 24021;
    const targetWebsite = result.targetWebsite || "http://localhost:3000";
    const socketUrl = `ws://localhost:${wsPort}`;

    // Lấy domain của trang web hiện tại có trùng với targetWebsite không
    if (!window.location.href.startsWith(targetWebsite)) {
        console.log("Not injecting CSS because current website does not match targetWebsite");
        return;
    }

    // Kết nối tới server WebSocket
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
        const cssPath = event.data;
        injectCSS(cssPath);
    };

    socket.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        setTimeout(() => {
            try {
                connectWebSocket(wsPort);
            } catch (error) {
                console.error("Error reconnecting WebSocket", error);
            }
        }, 1000);
    };

    function injectCSS(cssPath) {
        fetch(cssPath)
            .then((response) => response.text())
            .then((css) => {
                // Inject CSS vào trang nếu chưa có
                if (document.querySelector(`style[data-owner="Extension Import Style"]`)) {
                    const style = document.querySelector(`style[data-owner="Extension Import Style"]`);
                    style.textContent = css;
                    console.log("Injected updated CSS file");
                    return;
                }
                const style = document.createElement("style");
                style.textContent = css;
                style.type = "text/css";
                style.setAttribute("data-owner", "Extension Import Style");
                document.body.appendChild(style);
                console.log("Injected CSS file");
            })
            .catch((error) => {
                console.error("Error fetching CSS file", error);
            });
    }
});