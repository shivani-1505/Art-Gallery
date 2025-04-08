import { Link } from 'react-router-dom';
import adminIntroImage from './images/admin-bg.jpg';
import usersIcon from './images/canvas.png';
import approveIcon from './images/auction.png';
import therapistsIcon from './images/checklist.png';
import profileImage from './images/user (2).png';

function AdminHomePage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', width: '100vw', minHeight: '100vh' }}>
      {/* Mobile-specific CSS */}
      <style>{`
        @media only screen and (max-width: 767px) {
          header {
            padding: 10px 15px !important;
            position: fixed !important;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }
          header div {
            font-size: 18px !important;
          }
          nav ul {
            display: flex;
            justify-content: flex-end;
          }
          /* Add top padding to the rest of the content to avoid overlap with fixed header */
          .page-content {
            padding-top: 50px;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Admin Portal</div>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
            <li>
              <a href="#dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
            </li>
            <li>
              <a href="/admin-profile">
                <img src={profileImage} alt="Profile" style={{ width: "30px", height: "30px", borderRadius: "50%" }}/>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Wrap the rest of the page in a content container */}
      <div className="page-content">
        {/* Intro Section */}
        <section style={{ width: '100%', height: '30vh', background: `url(${adminIntroImage}) center/cover no-repeat`, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '20px', marginTop: '20px' }}><b>Welcome, Administrator</b></h1>
          <p style={{ color: '#2c3e50' }}>Oversee system operations and manage user activities efficiently!</p>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" style={{ padding: '40px 20px', backgroundColor: '#ecf0f1', textAlign: 'center' }}>
          <h2>Admin Tools</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {[
              { img: usersIcon, title: 'Manage Artworks', desc: 'Review, add, or remove artworks.', link: '/artworks' },
              { img: approveIcon, title: 'Auction Management', desc: 'Start and manage auction sessions.', link: '/auction' },
              { img: therapistsIcon, title: 'Verify Orders', desc: 'Review orders placed by the visitors.', link: '/orders' },
            ].map((item, index) => (
              <div key={index} style={{ width: '250px', margin: '20px', padding: '20px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={item.img} alt={item.title} style={{ width: '80px', height: '80px', marginBottom: '15px' }} />
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#3498db' }}>{item.title}</h3>
                  <p style={{ fontSize: '16px', color: '#555' }}>{item.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: '#34495e', color: 'white', padding: '20px 0', textAlign: 'center' }}>
          <p>2025 &copy; Admin Team</p>
        </footer>
      </div>
    </div>
  );
}

export default AdminHomePage;
