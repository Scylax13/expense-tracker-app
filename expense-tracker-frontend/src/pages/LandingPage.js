import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Visual charts and insights to understand your spending patterns and identify savings opportunities.'
    },
    {
      icon: '💰',
      title: 'Budget Tracking',
      description: 'Set monthly budgets and get real-time alerts when you approach your spending limits.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Track expenses on the go with our responsive design that works perfectly on all devices.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and secure. We never share your personal information.'
    },
    {
      icon: '📈',
      title: 'Progress Goals',
      description: 'Set financial goals and track your progress with beautiful visual indicators.'
    },
    {
      icon: '⚡',
      title: 'Quick Entry',
      description: 'Add expenses in seconds with our streamlined interface and smart categorization.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      text: 'TrackWise helped me save ₹15,000 in just 3 months! The visual charts made me realize how much I was spending on coffee.',
      avatar: '👩‍🎨'
    },
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      text: 'Finally found an expense tracker that actually works! The mobile interface is perfect for my busy lifestyle.',
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Student',
      text: 'As a student on a tight budget, TrackWise has been a game-changer. I can now track every rupee and stay within my limits.',
      avatar: '👩‍🎓'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '₹50M+', label: 'Expenses Tracked' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="landing-wrapper">
      {/* Navigation */}
      <nav className="landing-navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h2 className="brand-title">TrackWise</h2>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Take Control of Your
                <span className="gradient-text"> Financial Future</span>
              </h1>
              <p className="hero-description">
                TrackWise is your personal finance companion that helps you understand your spending, 
                set budgets, and achieve your financial goals with beautiful analytics and insights.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-large" onClick={() => navigate('/register')}>
                  Start Free Trial
                </button>
                
              </div>
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="preview-content">
                  <div className="preview-chart"></div>
                  <div className="preview-expenses">
                    <div className="expense-item">
                      <span className="expense-icon">🍕</span>
                      <div className="expense-details">
                        <div className="expense-title">Pizza Delivery</div>
                        <div className="expense-category">Food</div>
                      </div>
                      <div className="expense-amount">₹450</div>
                    </div>
                    <div className="expense-item">
                      <span className="expense-icon">🚗</span>
                      <div className="expense-details">
                        <div className="expense-title">Fuel</div>
                        <div className="expense-category">Travel</div>
                      </div>
                      <div className="expense-amount">₹800</div>
                    </div>
                    <div className="expense-item">
                      <span className="expense-icon">🛒</span>
                      <div className="expense-details">
                        <div className="expense-title">Grocery Shopping</div>
                        <div className="expense-category">Shopping</div>
                      </div>
                      <div className="expense-amount">₹1,200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose TrackWise?</h2>
            <p className="section-description">
              Everything you need to take control of your finances in one beautiful, easy-to-use platform.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-description">
              Join thousands of satisfied users who have transformed their financial lives with TrackWise.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Finances?</h2>
            <p className="cta-description">
              Join thousands of users who are already saving money and achieving their financial goals.
            </p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/register')}>
              Start Your Free Trial
            </button>
            <p className="cta-note">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-title">TrackWise</h3>
              <p className="footer-tagline">Smart expense tracking made simple</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <p>Features</p>
                <p>Pricing</p>
                <p>Security</p>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Status</p>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <p>About</p>
                <p>Blog</p>
                <p>Careers</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TrackWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
