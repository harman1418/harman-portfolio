import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Terminal,
  ShieldAlert,
  MessageSquare
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import './App.css';

/* ---------------- TYPEWRITER ---------------- */
const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let timeout;
    if (currentText.length < text.length) {
      timeout = setTimeout(
        () => setCurrentText(text.slice(0, currentText.length + 1)),
        delay
      );
    }
    return () => clearTimeout(timeout);
  }, [currentText, text, delay]);

  return (
    <span>
      {currentText}
      <span className="cursor">_</span>
    </span>
  );
};

/* ---------------- NETWORK BACKGROUND ---------------- */
const NetworkBackground = () => {
  const generateLogs = () => {
    let logs = [];
    for (let i = 0; i < 50; i++) {
      const ip1 = `192.168.1.${Math.floor(Math.random() * 255)}`;
      const ip2 = `10.0.0.${Math.floor(Math.random() * 255)}`;
      const port = Math.floor(Math.random() * (65535 - 1024) + 1024);

      logs.push(
        `[${new Date().toISOString()}] TCP ${ip1}:${port} -> ${ip2}:443 [SYN]`
      );
      logs.push(
        `[${new Date().toISOString()}] TCP ${ip2}:443 -> ${ip1}:${port} [SYN, ACK]`
      );
      logs.push(
        `[${new Date().toISOString()}] TCP ${ip1}:${port} -> ${ip2}:443 [ACK]`
      );
      logs.push(`[+] Connection established payload securely transmitting...`);
    }
    return logs.join('\n');
  };

  return (
    <div className="network-logs">
      <div className="log-scroller">
        {generateLogs() + '\n' + generateLogs()}
      </div>
    </div>
  );
};

/* ---------------- MAIN APP ---------------- */
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const form = useRef();
  const [transmitStatus, setTransmitStatus] = useState(
    'EXECUTE ./send_mail.sh'
  );

  const sendEmail = (e) => {
    e.preventDefault();
    setTransmitStatus('TRANSMITTING PAYLOAD...');

    emailjs
      .sendForm(
        'service_hrjpo6g',
        'template_ak2pyjx',
        form.current,
        's8YtWbpGca1xUWQTM'
      )
      .then(
        () => {
          setTransmitStatus('[+] DELIVERED SUCCESSFULLY');
          e.target.reset();
          setTimeout(
            () => setTransmitStatus('EXECUTE ./send_mail.sh'),
            3000
          );
        },
        (error) => {
          setTransmitStatus('[-] TRANSMISSION FAILED');
          console.log(error.text);
          setTimeout(
            () => setTransmitStatus('EXECUTE ./send_mail.sh'),
            3000
          );
        }
      );
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <>
      <div className="bg-grid"></div>
      <NetworkBackground />

      {/* NAVBAR */}
      <nav className="navbar">
        <div
          className="glow-text nav-brand"
          style={{
            color: isScrolled ? '#00ff00' : 'transparent'
          }}
        >
          <Terminal size={18} /> HARMANJOT_SINGH
        </div>

        <div className="nav-links">
          {[
            'About',
            'Skills',
            'Projects',
            'Education',
            'Certifications',
            'Achievements',
            'Contact'
          ].map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              smooth
              duration={500}
              offset={-90}
              className="nav-link"
            >
              ./{item.toLowerCase()}
            </Link>
          ))}
        </div>
      </nav>

      {/* ABOUT */}
      <section id="about">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="about-container"
        >
          <motion.div variants={itemVariant} className="glow-border">
            <h2>
              <Typewriter text="$ whoami" delay={100} />
            </h2>

            <h1 className="glow-text">Harmanjot Singh</h1>

            <h3>Penetration Tester & VAPT Intern</h3>

            <p>
              Cybersecurity professional with hands-on experience in live
              operations, vulnerability assessments, and incident response.
            </p>

            <div className="about-buttons">
              <a href="https://github.com/harman1418" target="_blank">
                <Github />
              </a>

              <a href="https://linkedin.com/in/harmanjotcs" target="_blank">
                <Linkedin />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="hacker-footer">
        <p>© {new Date().getFullYear()} Harmanjot Singh</p>
      </footer>

      <Link to="contact" smooth duration={500} className="floating-chat">
        <MessageSquare />
      </Link>
    </>
  );
};

export default App;
