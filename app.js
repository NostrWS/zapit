const form = document.getElementById('paywall-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const url = form.elements.url.value;
  const memo = form.elements.memo.value;
  const description = form.elements.description.value;
  const amount = form.elements.amount.value;
  const remembers = form.elements.remembers.checked;
  const apiKey = form.elements['api-key'].value;
  
  fetch('https://zapforart.site/paywall/api/v1/paywalls', {
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
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // display paywall ID and wallet address in the response
    const paywallId = data.id;
    const walletAddress = data.wallet;
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = `Paywall ID: ${paywallId}<br>Wallet Address: ${walletAddress}`;
  })
  .catch(error => {
    console.error(error);
    // handle the error
  });
});
