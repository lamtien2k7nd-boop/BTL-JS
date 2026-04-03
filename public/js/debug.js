/**
 * Debug Log Events
 * Logs important page lifecycle events for debugging purposes.
 */

// Log when the initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DEBUG] Event: DOMContentLoaded - DOM tree has been fully built.");
});

// Log when the whole page has loaded, including all dependent resources such as stylesheets and images
window.addEventListener("load", () => {
    console.log("[DEBUG] Event: load - The page and all its resources are fully loaded.");
});

// Log right before the window, document and its resources are about to be unloaded
window.addEventListener("beforeunload", (event) => {
    console.log("[DEBUG] Event: beforeunload - The user is navigating away or closing the page.");
});

// Optional: log visibility changes
document.addEventListener("visibilitychange", () => {
    console.log(`[DEBUG] Event: visibilitychange - Page visibility is now: ${document.visibilityState}`);
});
