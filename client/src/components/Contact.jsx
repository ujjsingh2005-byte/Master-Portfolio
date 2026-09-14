import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) errors.subject = 'Subject is required';

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!validateForm()) return;

    try {
      setStatus('loading');
      setErrorMessage('');
      
      const response = await sendContactMessage(formData);
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeader
          badge="Let's Connect"
          title="Get In Touch"
          subtitle="Have a question, project proposal, or opportunity? Drop me a message below!"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Column: Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem' }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                    <a href={`mailto:${profile?.email || 'alex.morgan.dev@example.com'}`} style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {profile?.email || 'alex.morgan.dev@example.com'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-secondary)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                      {profile?.location || 'San Francisco, CA'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Looking for a full-stack engineer?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                I am actively open to full-time engineering roles, freelance opportunities, and collaborative technical projects.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={48} color="var(--status-success)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. I have received your message and will respond as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {status === 'error' && (
                  <div style={{ padding: '0.9rem 1.25rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--status-error)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: fieldErrors.name ? '1px solid var(--status-error)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {fieldErrors.name && <span style={{ fontSize: '0.8rem', color: 'var(--status-error)', marginTop: '0.25rem', display: 'block' }}>{fieldErrors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: fieldErrors.email ? '1px solid var(--status-error)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {fieldErrors.email && <span style={{ fontSize: '0.8rem', color: 'var(--status-error)', marginTop: '0.25rem', display: 'block' }}>{fieldErrors.email}</span>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: fieldErrors.subject ? '1px solid var(--status-error)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {fieldErrors.subject && <span style={{ fontSize: '0.8rem', color: 'var(--status-error)', marginTop: '0.25rem', display: 'block' }}>{fieldErrors.subject}</span>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello! I'd like to discuss a project..."
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: fieldErrors.message ? '1px solid var(--status-error)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      resize: 'vertical'
                    }}
                  />
                  {fieldErrors.message && <span style={{ fontSize: '0.8rem', color: 'var(--status-error)', marginTop: '0.25rem', display: 'block' }}>{fieldErrors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 868px) {
          #contact div[style*="grid-template-columns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
