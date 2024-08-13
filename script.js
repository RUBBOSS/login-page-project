document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  burgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const cancelButton = document.getElementById('cancel-button');
  const loginButton = document.getElementById('login-button');
  
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const loginResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emilys',
          password: 'emilyspass',
          expiresInMins: 30
        })
      });
      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        const token = loginData.token; 
        localStorage.setItem('authToken', token);
        
        const userResponse = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await userResponse.json();
        
        console.table('Authenticated User:', userData);
        
      } else {
        console.error('Login failed:', loginData);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  });

  cancelButton.addEventListener('click', () => {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  });

  async function refreshAuthToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      console.error('No refresh token available');
      return;
    }

    try {
      const refreshResponse = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: refreshToken,
          expiresInMins: 30
        })
      });
      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok) {
        const newToken = refreshData.token;
        localStorage.setItem('authToken', newToken);
      } else {
        console.error('Token refresh failed:', refreshData);
      }
    } catch (error) {
      console.error('Error during token refresh:', error);
    }
  }
});
