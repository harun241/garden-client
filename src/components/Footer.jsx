import React from 'react';

const Footer = () => {
  return (
    <footer className='mt-20 max-w-7xl mx-auto' style={styles.footer}>
      <div className='' style={styles.container}>
        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Info</h4>
          <p style={styles.text}>Email: support@yourdomain.com</p>
          <p style={styles.text}>Phone: +1 (123) 456-7890</p>
          <p style={styles.text}>Address: 123 Garden St, Plant City</p>
        </div>

        {/* Terms */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Terms</h4>
          <a href="/terms" style={styles.link}>Terms of Service</a><br />
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
        </div>

      
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>Instagram</a>
          </div>
        </div>
      </div>

      <div style={styles.copyRight}>
        &copy; {new Date().getFullYear()} YourProjectName. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '40px 20px 20px',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '900px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '30px',
  },
  section: {
    minWidth: '200px',
  },
  heading: {
    marginBottom: '12px',
    fontSize: '18px',
    borderBottom: '2px solid #27ae60',
    paddingBottom: '6px',
    fontWeight: '600',
  },
  text: {
    margin: '6px 0',
    fontSize: '14px',
  },
  link: {
    color: '#27ae60',
    textDecoration: 'none',
    fontSize: '14px',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialLink: {
    color: '#1abc9c',
    textDecoration: 'none',
    fontSize: '14px',
  },
  copyRight: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '12px',
    color: '#95a5a6',
  },
};

export default Footer;
