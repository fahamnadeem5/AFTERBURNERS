document.addEventListener('DOMContentLoaded',()=>{
  const form = document.getElementById('tryoutForm');
  const msg = document.getElementById('tryoutMessage');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    if(!data.get('name') || !data.get('ign') || !data.get('contact')){
      msg.textContent = 'Please fill name, IGN and contact.';
      msg.style.color = '#ffb3b3';
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending...';
    msg.textContent = '';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });
      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }
      msg.textContent = 'Thanks! Your application was sent to the Afterburners team.';
      msg.style.color = '#b7f7d0';
      form.reset();
    } catch (error) {
      console.error(error);
      msg.textContent = 'We could not send your application. Please try again.';
      msg.style.color = '#ffb3b3';
    } finally {
      button.disabled = false;
      button.textContent = 'Submit Application';
    }
  });
});