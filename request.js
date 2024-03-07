document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('translateBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputBox').value;

    chrome.storage.sync.get(['apiKey'], function(result) {
      const apiKey = result.apiKey;
      const url = 'https://api-free.deepl.com/v2/translate?auth_key=' + apiKey + '&text=' + encodeURIComponent(inputText) + '&source_lang=JA&target_lang=EN'

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const insertText = `翻訳結果\n${data.translations[0].text}`
          document.getElementById('translationResult').innerText = insertText;
        })
        .catch(error => console.error('Error:', error));
    });
  });
});
