# 3D Modern Login Page

A beautiful, responsive, and interactive login page with 3D effects, smooth animations, and theme support. This project showcases modern web development techniques with HTML5, CSS3, and vanilla JavaScript.

![Login Page Preview](https://via.placeholder.com/800x500/6c63ff/ffffff?text=3D+Modern+Login+Page)

## ✨ Features

- **3D Tilt Effect**: Interactive 3D tilt on mouse movement
- **Dark/Light Theme**: Toggle between light and dark modes
- **Particle.js Background**: Dynamic animated background
- **Form Validation**: Real-time input validation with visual feedback
- **Social Login**: Demo buttons for Google and GitHub login
- **Password Toggle**: Show/hide password visibility
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessibility**: Built with accessibility in mind


## 🛠️ Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (Variables, Flexbox, Grid, Animations)
  - JavaScript (ES6+)
  - [Particles.js](https://vincentgarreau.com/particles.js/) for background effects
  - [Font Awesome](https://fontawesome.com/) for icons
  - [Google Fonts](https://fonts.google.com/) (Poppins)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arisha-452000/3D-Modern-Login-Page
   cd 3d-modern-login
   ```

2. **Open in browser**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server like Live Server in VS Code

## 🎨 Customization

### Theme Colors
Edit the CSS variables in `styles.css` to match your brand:

```css
:root {
    --primary: #6c63ff;
    --primary-dark: #5a52d3;
    --secondary: #ff6b6b;
    --success: #4BB543;
    --error: #ff3860;
    --text: #2c3e50;
    --text-light: #7f8c8d;
    --bg: #f8f9fa;
    --card-bg: #ffffff;
    --border: #e0e0e0;
}
```

### Particle Effects
Adjust the particle settings in `script.js`:

```javascript
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#6c63ff' },
        // ... other settings
    }
});
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS/Android)

## 📱 Responsive Design

The login page is fully responsive and works on:
- Desktop (≥1024px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔒 Security Note

This is a frontend-only demo. For production use:
- Implement proper backend authentication
- Use HTTPS
- Add CSRF protection
- Implement rate limiting
- Use secure cookies with HttpOnly and Secure flags

## 📝 License

This project is licensed under the MIT License 

## 🙏 Acknowledgments

- [Particles.js](https://vincentgarreau.com/particles.js/) for the beautiful background
- [Font Awesome](https://fontawesome.com/) for the icons
- [Google Fonts](https://fonts.google.com/) for the Poppins font


Project Link: [https://github.com/Arisha-452000/3D-Modern-Login-Page](https://github.com/Arisha-452000/3D-Modern-Login-Page)

---

Made with ❤️ by Your Name
