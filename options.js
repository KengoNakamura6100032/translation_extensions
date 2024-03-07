// options.js

document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('apiKey');
    const saveBtn = document.getElementById('saveBtn');
  
    // 保存ボタンがクリックされたときに API キーを保存する
    saveBtn.addEventListener('click', function() {
      const apiKey = apiKeyInput.value;
      chrome.storage.sync.set({ 'apiKey': apiKey }, function() {
        console.log('API Key saved:', apiKey);
        alert('API Key saved successfully!');

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length > 0) {
              chrome.tabs.remove(tabs[0].id);
            }
        });
      });
    });
  
    // オプションページが開かれたときに保存された API キーを取得して入力欄に表示する
    chrome.storage.sync.get(['apiKey'], function(result) {
      const savedApiKey = result.apiKey;
      if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
      }
    });
  });
  