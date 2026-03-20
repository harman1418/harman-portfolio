import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Terminal, ShieldAlert, Fingerprint, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './App.css';

const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  
  useEffect(() => {
    let timeout;
    if (currentText.length < text.length) {
      timeout = setTimeout(() => setCurrentText(text.slice(0, currentText.length + 1)), delay);
    }
    return () => clearTimeout(timeout);
  }, [currentText, text, delay]);
  
  return <span>{currentText}<span className="cursor">_</span></span>;
};

const NetworkBackground = () => {
  const generateLogs = () => {
    let logs = [];
    for(let i=0; i<50; i++) {
      const ip1 = `192.168.1.${Math.floor(Math.random() * 255)}`;
      const ip2 = `10.0.0.${Math.floor(Math.random() * 255)}`;
      const port = Math.floor(Math.random() * (65535 - 1024) + 1024);
      logs.push(`[${new Date().toISOString()}] TCP ${ip1}:${port} -> ${ip2}:443 [SYN] Seq=0 Win=64240 Len=0`);
      logs.push(`[${new Date().toISOString()}] TCP ${ip2}:443 -> ${ip1}:${port} [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0`);
      logs.push(`[${new Date().toISOString()}] TCP ${ip1}:${port} -> ${ip2}:443 [ACK] Seq=1 Ack=1 Win=64240 Len=0`);
      logs.push(`[+] Connection established payload securely transmitting...`);
    }
    return logs.join('\n');
  };
  
  return (
    <div className="network-logs">
      <div className="log-scroller">{generateLogs() + '\n' + generateLogs()}</div>
    </div>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const form = useRef();
  const [transmitStatus, setTransmitStatus] = useState('EXECUTE ./send_mail.sh');

  const sendEmail = (e) => {
    e.preventDefault();
    setTransmitStatus('TRANSMITTING PAYLOAD...');

    emailjs.sendForm(
      'service_hrjpo6g',
      'template_ak2pyjx',
      form.current,
      's8YtWbpGca1xUWQTM'
    )
    .then((result) => {
      setTransmitStatus('[+] DELIVERED SUCCESSFULLY');
      e.target.reset();
      setTimeout(() => setTransmitStatus('EXECUTE ./send_mail.sh'), 3000);
    }, (error) => {
      setTransmitStatus('[-] TRANSMISSION FAILED');
      console.log(error.text);
      setTimeout(() => setTransmitStatus('EXECUTE ./send_mail.sh'), 3000);
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariant = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

  return (
    <>
      <div className="bg-grid"></div>
      <NetworkBackground />

      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        backgroundColor: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 255, 0, 0.3)', padding: '15px 10%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box'
      }}>
        <div className="glow-text nav-brand" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isScrolled ? '#00ff00' : 'transparent', transition: 'color 0.3s' }}>
          <Terminal size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/> HARMANJOT_SINGH
        </div>

        <div className="hide-scrollbar" style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '100%' }}>
          {['About', 'Skills', 'Projects', 'Education', 'Certifications', 'Achievements', 'Contact'].map((item) => (
            <Link key={item} to={item.toLowerCase()} spy={true} smooth={true} offset={-90} duration={500} className="nav-link">
              ./{item.toLowerCase()}
            </Link>
          ))}
        </div>
      </nav>

      <section id="about" style={{ paddingTop: '130px' }}>
        <motion.div className="about-container" variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>

          <motion.div variants={itemVariant} className="glow-border" style={{ padding: '40px', borderRadius: '8px' , flex: '1'}}>
            <h2 style={{ fontSize: '1.2rem', color: '#a8ffb2', margin: 0 }}><Typewriter text="$ whoami" delay={100} /></h2>
            <h1 className="glow-text" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', margin: '10px 0' }}>Harmanjot Singh</h1>
            <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', borderLeft: '4px solid #00ff00', paddingLeft: '15px', marginBottom: '30px', marginTop: 0 }}>
              Penetration Tester & VAPT Intern
            </h3>
            <p style={{ lineHeight: '1.8', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#ccc' }}>
              Cybersecurity professional with hands-on experience in live operations, vulnerability assessments, and incident response. Proficient in OWASP Top 10 testing and network scanning using Nmap, Burp Suite, Metasploit, and Kali Linux.
            </p>

            <div className="about-buttons" style={{ display: 'flex', gap: '20px', marginTop: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/harman1418" target="_blank" rel="noreferrer" style={{ color: '#00ff00' }}><Github size={30} /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="https://linkedin.com/in/harmanjotcs" target="_blank" rel="noreferrer" style={{ color: '#00ff00' }}><Linkedin size={30} /></motion.a>

              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 0, 0.1)' }}
                href="/Harmanjot Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00ff00', border: '1px solid #00ff00', padding: '8px 15px',
                  borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px'
                }}>
                <Terminal size={16} /> View_Resume.pdf
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariant} className="glow-border profile-pic-box"
            style={{
              width: '260px', height: '260px', flexShrink: 0,
              borderRadius: '50%', border: '2px dashed #00ff00',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)'
            }}>
            <img src="/profile.jpeg" alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'none', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#00ff0088' }}>
              [ INSERT_IMAGE ]<br/>Put profile.jpeg in public/ folder
            </div>
            <motion.div animate={{ y: [-130, 130] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute', top: '50%', left: 0, width: '100%', height: '3px',
                backgroundColor: '#a8ffb2', boxShadow: '0 0 20px 4px #00ff00', opacity: 0.8
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="skills">
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '40px', textAlign: 'center' }}><Typewriter text="./skills.sh" delay={80} /></motion.h2>
          
          <div className="skills-timeline">
            {/* The animated wire and dot */}
            <div className="skills-wire"></div>
            <div className="neon-dot"></div>

            {[
              { title: "Languages", tech: "Python, Bash, C++, JavaScript" },
              { title: "Pen-Testing Tools", tech: "Nmap, Burp Suite, Metasploit, Wireshark, SQLmap, Hydra" },
              { title: "Web & Networking", tech: "HTTP/HTTPS, TCP/IP, VPNs, Firewalls, IDS" },
              { title: "Environments", tech: "Kali Linux, Windows Subsystem for Linux (WSL)" }
            ].map((skill, i) => (
              // Apply 'left' class to even indexes (0, 2) and 'right' to odd (1, 3)
              <motion.div variants={itemVariant} key={i} className={`skill-row ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="skill-card-wrapper">
                  <div className="glow-border" style={{ padding: '25px', borderRadius: '8px', height: '100%' }}>
                    <h3 style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px', marginTop: 0 }}>{skill.title}</h3>
                    <p style={{ color: '#a8ffb2', lineHeight: '1.6', marginBottom: 0 }}>{skill.tech}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects">
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '40px' }}><Typewriter text="./execute_projects" delay={80} /></motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

            <motion.div variants={itemVariant} className="glow-border" style={{ padding: '35px', borderRadius: '8px', position: 'relative' }}>
              <ShieldAlert size={40} style={{ position: 'absolute', top: 35, right: 35, opacity: 0.2 }} />
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: '#fff', marginTop: 0 }}>Phishing Website Detection</h3>
              <p style={{ color: '#a8ffb2', marginBottom: '20px' }}>Machine Learning Classifier | Python | XGBoost</p>
              <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Built a phishing detection system achieving 96.68% accuracy.</li>
                <li>Engineered a real-time feature extractor to analyze 87 URL attributes.</li>
                <li>Validated the model with 96.19% precision to reduce false positives.</li>
              </ul>
              <a href="https://github.com/harman1418/Phishing_Detection" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#00ff00', textDecoration: 'none', marginTop: '15px' }}>
                <ExternalLink size={18} /> View Source Code
              </a>
            </motion.div>

            <motion.div variants={itemVariant} className="glow-border" style={{ padding: '35px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: '#fff', marginTop: 0 }}>WanderChat</h3>
              <p style={{ color: '#a8ffb2', marginBottom: '20px' }}>AI-Powered Travel Itinerary Generator | ReactJS | FastAPI | Gemini API</p>
              <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Developed a web application to generate personalized travel itineraries from natural language input.</li>
                <li>Over 100 users tested the platform with strong feedback on accuracy and usability.</li>
              </ul>
              <a href="https://github.com/harman1418/WanderChat" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#00ff00', textDecoration: 'none', marginTop: '15px' }}>
                <ExternalLink size={18} /> View Source Code
              </a>
            </motion.div>

          </div>
        </motion.div>
      </section>

      <section id="education">
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', marginBottom: '40px' }}><Typewriter text="cat /etc/education" delay={80} /></motion.h2>
          <motion.div variants={itemVariant} className="glow-border" style={{ padding: '35px', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div style={{ borderLeft: '2px solid #333', paddingLeft: '20px' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#fff', margin: '0 0 10px 0' }}>Bachelor of Technology, Computer Science and Engineering</h3>
                <h4 style={{ color: '#a8ffb2', margin: '0 0 10px 0' }}>Gulzar Group of Institutes</h4>
                <p style={{ color: '#ccc', margin: 0 }}>Expected Graduation: 2026</p>
              </div>
              <div style={{ borderLeft: '2px solid #333', paddingLeft: '20px' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#fff', margin: '0 0 10px 0' }}>Senior Secondary (10+2)</h3>
                <h4 style={{ color: '#a8ffb2', margin: '0 0 10px 0' }}>Dayal Public School | PSEB Board</h4>
                <p style={{ color: '#ccc', margin: 0 }}>2021 - 2022</p>
              </div>
              <div style={{ borderLeft: '2px solid #333', paddingLeft: '20px' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#fff', margin: '0 0 10px 0' }}>Matriculation (Class 10)</h3>
                <h4 style={{ color: '#a8ffb2', margin: '0 0 10px 0' }}>Dayal Public School | PSEB Board</h4>
                <p style={{ color: '#ccc', margin: 0 }}>2019 - 2020</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="certifications">
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '40px' }}><Typewriter text="ls /certifications" delay={80} /></motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

            {[
              { name: "Cybersecurity Virtual Internship", issuer: "Palo Alto Networks", image: "/cert1.jpg" },
              { name: "Ethical Hacking Essentials", issuer: "EC-Council", image: "/cert2.jpg" },
              { name: "Cyber Job Simulation", issuer: "Deloitte Australia", image: "/cert3.jpg" }
            ].map((cert, i) => (

              <motion.div variants={itemVariant} key={i} className="glow-border" style={{ padding: '25px', textAlign: 'center', borderRadius: '8px' }}>
                <a href={cert.image} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '180px', backgroundColor: '#050505', border: '1px solid #333', marginBottom: '20px', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={cert.image} alt={cert.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, transition: 'transform 0.3s ease' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#555', fontSize: '0.9rem' }}>
                    [ Missing {cert.image} ]<br/>Place in public/ folder
                  </div>
                </a>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 10px 0' }}>{cert.name}</h3>
                <p style={{ color: '#a8ffb2', margin: 0 }}>{cert.issuer}</p>
              </motion.div>

            ))}
          </div>
        </motion.div>
      </section>

      <section id="achievements">
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', marginBottom: '40px' }}><Typewriter text="./read_logs --achievements" delay={80} /></motion.h2>
          <motion.div variants={itemVariant} className="glow-border" style={{ padding: '35px', borderRadius: '8px' }}>
            <ul style={{ color: '#ccc', lineHeight: '2.2', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', listStyleType: 'square', paddingLeft: '20px', margin: 0 }}>
              <li>Practiced Capture The Flag (CTF) challenges on TryHackMe and Hack The Box to sharpen exploitation skills.</li>
              <li>Completed cybersecurity simulations from Deloitte, Mastercard, Palo Alto Networks, and TCS.</li>
              <li>Maintained security testing scripts and penetration testing projects on GitHub.</li>
              <li>Regularly monitor vulnerability disclosures, CVE feeds, and cybersecurity research blogs.</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <section id="contact" style={{ paddingBottom: '150px' }}>
        <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <motion.h2 variants={itemVariant} className="glow-text" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: '30px', marginTop: 0 }}><Typewriter text="ping --contact" delay={80} /></motion.h2>

          <div className="side-by-side-container">

            <motion.div variants={itemVariant} className="glow-border contact-box" style={{ padding: '40px', borderRadius: '8px' }}>
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '25px', borderBottom: '1px dashed #00ff00', paddingBottom: '10px' }}>Target Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Mail color="#00ff00" size={28} style={{ flexShrink: 0 }}/>
                  <a href="mailto:harmanjot21754@gmail.com" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-all' }} onMouseOver={e => e.target.style.color='#00ff00'} onMouseOut={e => e.target.style.color='#ccc'}>
                    harmanjot21754@gmail.com
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Phone color="#00ff00" size={28} style={{ flexShrink: 0 }}/>
                  <a href="tel:+917889169131" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#00ff00'} onMouseOut={e => e.target.style.color='#ccc'}>
                    +91 78891 69131
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#ccc' }}>
                  <MapPin color="#00ff00" size={28} style={{ flexShrink: 0 }}/> Ludhiana, Punjab, IN
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="glow-border contact-box" style={{ padding: '40px', borderRadius: '8px' }}>
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '25px', borderBottom: '1px dashed #00ff00', paddingBottom: '10px' }}>Initiate Direct Connection</h3>
              <form ref={form} onSubmit={sendEmail}>
                <input type="text" name="user_name" placeholder="Your Name/Alias" required />
                <input type="email" name="user_email" placeholder="Your IP/Email" required />
                <textarea name="message" rows="5" placeholder="Enter encrypted payload (Message)..." required></textarea>

                <button type="submit" style={{
                  background: transmitStatus === '[+] DELIVERED SUCCESSFULLY' ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
                  border: '1px solid #00ff00',
                  color: '#00ff00',
                  padding: '12px 25px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold', width: '100%',
                  transition: 'all 0.3s'
                }} onMouseOver={e => {e.target.style.backgroundColor='rgba(0, 255, 0, 0.1)'; e.target.style.boxShadow='0 0 10px rgba(0,255,0,0.5)'}} onMouseOut={e => {e.target.style.backgroundColor='transparent'; e.target.style.boxShadow='none'}}>
                  {transmitStatus}
                </button>
              </form>
            </motion.div>

          </div>
        </motion.div>
      </section>

      <footer className="hacker-footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="glow-text" style={{ margin: 0, fontSize: '1.8rem' }}>Harmanjot Singh</h2>
            <p style={{ margin: '8px 0 0 0', color: '#a8ffb2', fontSize: '1.1rem' }}>
              Penetration Tester | VAPT Intern
            </p>
          </div>

          <div className="footer-right">
            <a href="https://linkedin.com/in/harmanjotcs" target="_blank" rel="noreferrer"><Linkedin size={28} /></a>
            <a href="https://github.com/harman1418" target="_blank" rel="noreferrer"><Github size={28} /></a>
            <a href="mailto:harmanjot21754@gmail.com"><Mail size={28} /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Harmanjot Singh. All rights reserved. <span style={{color: '#00ff00'}}>[System.exit(0);]</span>
          </p>
        </div>
      </footer>

      <Link to="contact" spy={true} smooth={true} duration={500} offset={-90} className="floating-chat glow-border">
        <MessageSquare color="#00ff00" size={28} />
      </Link>
    </>
  );
};

export default App;
