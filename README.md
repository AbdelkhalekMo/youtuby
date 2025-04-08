# YouTube Playlist Services Landing Page

A modern, responsive landing page template designed for YouTube content creators who want to showcase their services and connect with clients through WhatsApp.

## Features

- **Modern Design**: Clean, professional appearance with attractive animations
- **Fully Responsive**: Works perfectly on all device sizes
- **SEO Optimized**: Proper meta tags and semantic HTML for better search engine visibility
- **Bootstrap 5**: Built with the latest Bootstrap framework for reliability and ease of customization
- **Beautiful Transitions**: Smooth animations using AOS (Animate On Scroll) library
- **Fixed Image Containers**: Handles images of various sizes and aspect ratios elegantly
- **WhatsApp Integration**: Direct links to WhatsApp for client communication
- **YouTube Embedding**: Showcase your playlist directly on the landing page

## Customization Guide

### 1. Personal Information

Update the following:

- Replace "Your Name" in the meta author tag
- Update all contact information (email, phone, WhatsApp)
- Replace "Your Company Name" in the footer with your brand name
- Update social media links

### 2. WhatsApp Integration

All WhatsApp links use the format `https://wa.me/yourphonenumber`. Replace "yourphonenumber" with your actual WhatsApp number in international format (without + symbol).

Example: `https://wa.me/12345678900` for a US number +1 (234) 567-8900

### 3. YouTube Playlist

Replace "PLAYLIST_ID" in the iframe src attribute with your actual YouTube playlist ID. You can find this in your YouTube playlist URL (it's the value after "list=").

### 4. Images

- Replace all placeholder images in the `img` folder:
  - logo.png: Your brand logo
  - favicon.png: Website favicon
  - hero-bg.jpg: Hero section background
  - portfolio-1.jpg, portfolio-2.jpg, portfolio-3.jpg: Portfolio samples
  - testimonial-1.jpg, testimonial-2.jpg, testimonial-3.jpg: Client testimonial photos

### 5. Colors

The primary colors are set in the CSS file as CSS variables. To change the color scheme, edit these variables in the style.css file:

```css
:root {
    --primary-color: #ff0000; /* YouTube red */
    --secondary-color: #065fd4; /* YouTube blue */
    --dark-color: #212529;
    --light-color: #f8f9fa;
}
```

### 6. Content

Update the content throughout the HTML file to reflect your specific services, portfolio, and testimonials.

## File Structure

```
landing-page/
├── css/
│   └── style.css
├── img/
│   ├── favicon.png
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── portfolio-1.jpg
│   ├── portfolio-2.jpg
│   ├── portfolio-3.jpg
│   ├── testimonial-1.jpg
│   ├── testimonial-2.jpg
│   └── testimonial-3.jpg
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Browser Compatibility

This landing page template is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge
- Opera
