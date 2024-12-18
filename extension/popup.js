document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("configForm");
    const wsPortInput = document.getElementById("wsPort");
    const targetWebsiteInput = document.getElementById("targetWebsite");
    const status = document.getElementById("status");
    const turnOnInput = document.getElementById("turnOn");

    // Load existing settings
    chrome.storage.local.get(["wsPort", "targetWebsite", "turnOn"], (result) => {
        if (result.wsPort) wsPortInput.value = result.wsPort;
        if (result.targetWebsite) targetWebsiteInput.value = result.targetWebsite;
        if (result.turnOn) turnOnInput.checked = result.turnOn ? true : false;
    });

    // Save settings when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const wsPort = wsPortInput.value || 24021;
        const targetWebsite = targetWebsiteInput.value || "http://localhost:3000";
        const turnOn = turnOnInput.checked ? true : false;

        chrome.storage.local.set({ wsPort, targetWebsite, turnOn }, () => {
            status.style.display = "block"; // Show success message
            setTimeout(() => {
                status.style.display = "none"; // Hide after 2 seconds
            }, 2000);
        });
    });
});
