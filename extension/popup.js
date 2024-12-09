document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("configForm");
    const wsPortInput = document.getElementById("wsPort");
    const targetWebsiteInput = document.getElementById("targetWebsite");
    const status = document.getElementById("status");

    // Load existing settings
    chrome.storage.local.get(["wsPort", "targetWebsite"], (result) => {
        if (result.wsPort) wsPortInput.value = result.wsPort;
        if (result.targetWebsite) targetWebsiteInput.value = result.targetWebsite;
    });

    // Save settings when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const wsPort = wsPortInput.value;
        const targetWebsite = targetWebsiteInput.value;

        chrome.storage.local.set({ wsPort, targetWebsite }, () => {
            status.style.display = "block"; // Show success message
            setTimeout(() => {
                status.style.display = "none"; // Hide after 2 seconds
            }, 2000);
        });
    });
});
