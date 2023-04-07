const form = document.getElementById('paywall-form');

// Auto-fill userAPI key if available
const apiKeyField = form.elements['api-key'];
const storedApiKey = localStorage.getItem('apiKey');
if (storedApiKey) {
  const decryptedApiKey = decrypt(storedApiKey);
  apiKeyField.value = decryptedApiKey;
}

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  
  const { url, memo, description, amount, remembers, rememberApiKey } = getFormData();
  const apiKey = apiKeyField.value;

  createPaywall({
    url,
    memo,
    description,
    amount,
    remembers,
    apiKey
  })
  .then(showPaywallLink)
  .catch(handleError);

  if (rememberApiKey) {
    saveApiKey(apiKey);
  }
}

function getFormData() {
  return {
    url: form.elements.url.value,
    memo: form.elements.memo.value,
    description: form.elements.description.value,
    amount: form.elements.amount.value,
    remembers: form.elements.remembers.checked,
    rememberApiKey: form.elements.rememberApiKey.checked
  };
}
// ... rest of the JavaScript code

function createPaywall({ url, memo, description, amount, remembers, apiKey }) {
  return fetch('https://zapforart.site/paywall/api/v1/paywalls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey
    },
    body: JSON.stringify({
      url,
      memo,
      description,
      amount,
      remembers
    })
  })
  .then(response => response.json());
}

function showPaywallLink(data) {
  const paywallId = data.id;
  const responseElement = document.getElementById('response');
  responseElement.innerHTML = `
    <button id="copyBtn">Copy Paywall link</button>
  `;
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', () => {
    copyToClipboard(`https://zapforart.site/paywall/${paywallId}`);
    showCopiedMessage(copyBtn);
  });
  showElement(responseElement);
}

function handleError(error) {
  console.error(error);
  // handle the error
}

function showElement(element) {
  element.style.display = "block";
}

function copyToClipboard(text) {
  const tempElement = document.createElement('textarea');
  tempElement.value = text;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);
}

function showCopiedMessage(button) {
  button.innerText = 'Copied!';
  setTimeout(() => {
    button.innerText = 'Copy Paywall Link';
  }, 1000);
}

function encrypt(data) {
  // TODO: implement encryption algorithm
  return data;
}

function decrypt(data) {
  // TODO: implement decryption algorithm
  return data;
}

function saveApiKey(apiKey) {
  const encryptedApiKey = encrypt(apiKey);
  localStorage.setItem('apiKey', encryptedApiKey);
}
