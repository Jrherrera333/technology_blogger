// Wrap your code inside a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // Your code here

  // Example:
  async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);
});
