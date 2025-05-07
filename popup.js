let isEnabled = false;
const toggleButton = document.querySelector("#isEnabled");

browser.storage.sync.get("isEnabled", (data) => {
  isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
  toggleButton.checked = isEnabled;
  updateIcon();
});

toggleButton.addEventListener("change", () => {
  isEnabled = toggleButton.checked;
  browser.storage.sync.set({ isEnabled });
  updateIcon();
});

function updateIcon() {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url ?? "";
    if (url.startsWith("https://chatgpt.com") ||
        url.startsWith("https://poe.com") ||
        url.startsWith("https://www.phind.com") ||
        url.startsWith("https://chat.mistral.ai") ||
        // url.startsWith("https://www.chatpdf.com") ||
        url.startsWith("https://www.perplexity.ai") ||
        url.startsWith("https://claude.ai") ||
        url.startsWith("https://notebooklm.google.com") ||
        url.startsWith("https://gemini.google.com") ||
        url.startsWith("https://you.com") ||
        url.startsWith("https://v0.dev") ||
        url.startsWith("https://chat.deepseek.com") ||
        url.startsWith("https://dashboard.cohere.com/playground/chat") ||
        url.startsWith("https://copilot.microsoft.com")) {
      browser.action.setIcon({ path: isEnabled ? "icon/enabled.png" : "icon/disabled.png" });
    }
  });
}
