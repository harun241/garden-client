import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Oeishi',
    feedback: 'Amazing gardening tips! My plants are thriving now.',
    photo: 'https://i.ibb.co/mrM39XM4/businesswoman-posing-23-2148142829.jpg',
  },
  {
    id: 2,
    name: 'Rafi',
    feedback: 'Great community and helpful advice for beginners.',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: 3,
    name: 'Maya',
    feedback: 'Love the plant care guides, very detailed and easy to follow.',
    photo: 'https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg',
  },
];

const Testimonial = () => {
  return (
    <section style={{ padding: '40px 20px', background: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>What Our Users Say</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', flexWrap: 'wrap' }}>
        {testimonials.map(({ id, name, feedback, photo }) => (
          <div key={id} style={{ maxWidth: '300px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' }}>
            <img src={photo} alt={name} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
            <p style={{ fontStyle: 'italic', margin: '15px 0' }}>"{feedback}"</p>
            <p style={{ fontWeight: '600', color: '#27ae60' }}>- {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
