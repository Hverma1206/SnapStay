import React, { useEffect, useRef, useState } from 'react';
import { Code2, Rocket, Users, Laptop, ExternalLink, Star, ArrowRight, Linkedin } from 'lucide-react';
import edtechImage from './assets/img/img1.png';
import atsImage from './assets/img/img2.png';
import codeEditorImage from './assets/img/img3.png';
import ankitimg from './assets/img/ankit.jpg';
import himimg from './assets/img/himanshu.jpg';
import akshit from './assets/img/ankit.png';
import yogesh from './assets/img/yogesh.jpg';

const projects = [
  {
    title: "EdTech",
    description: "An EdTech platform built with React and Node.js, functioning as an LMS for course purchases and training.",
    image: edtechImage, 
    link: "https://apcci.in/",
    status: "Work in Progress", 
    tags: ["React", "Node.js", "LMS"]
  },
  {
    title: "Real Time Collaborating Code Editor",
    description: "Real Time Collaborating Code Editor using React, Nodejs, and Socket.io",
    image: codeEditorImage,  
    link: "http://editor.snapstay.in.s3-website.eu-north-1.amazonaws.com/",
    tags: ["React", "Nodejs","Express", "Socket.io"]
  },
  {
    title: "Application Tracking System",
    description: "Made complete Application Tracking System(ATS) using MERN stack",
    image: atsImage,  
    link: "https://ats.mentorpal.ai/",
    tags: ["React", "Nodejs", "MongoDB", "Express"]
  }
];

const team = [
  {
    name: "Ankit",
    role: "SDE-1",
    image: ankitimg,
    projects: 10,
    experience: "3+ years",
    linkedin: "https://www.linkedin.com/in/imankii01/"
  },
  {
    name: "Himanshu",
    role: "Full Stack Developer",
    image: himimg,
    projects: 7,
    experience: "1.5+ years",
    linkedin: "https://www.linkedin.com/in/himanshu-verma12/"
  },
  {
    name: "Akshit",
    role: "Frontend Developer",
    image: akshit,
    projects: 5,
    experience: "1+ years",
    linkedin: "https://www.linkedin.com/in/akshit-kumar-9aa238318/"
  },
  {
    name: "Yogesh",
    role: "Frontend Developer",
    image: yogesh,
    projects: 6,
    experience: "1.5+ years",
    linkedin: "https://www.linkedin.com/in/yogesh-kumar-a11779267/"
  }
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitStatus({ status: 'loading', message: 'Sending your message...' });
      
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ 
          status: 'success', 
          message: 'Thank you! Your message has been sent successfully.'
        });
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ 
        status: 'error', 
        message: 'Sorry, there was a problem sending your message. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-50 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-on-scroll">
          <h2 className="text-5xl font-bold mb-4 text-slate-900">Get in Touch</h2>
          <p className="text-slate-600 max-w-4xl mx-auto text-2xl">
            Ready to start your project? Contact us for a free consultation
          </p>
        </div>
        <div className="max-w-2xl mx-auto relative z-20">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
            <div className="relative z-30">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
                style={{ zIndex: 30 }}
              />
            </div>
            <div className="relative z-30">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
                style={{ zIndex: 30 }}
              />
            </div>
            <div className="relative z-30">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-300"
                style={{ zIndex: 30 }}
              ></textarea>
            </div>
            
            {submitStatus.status !== 'idle' && (
              <div className={`text-center p-3 rounded-lg ${
                submitStatus.status === 'loading' ? 'bg-blue-50 text-blue-700' : 
                submitStatus.status === 'success' ? 'bg-green-50 text-green-700' : 
                'bg-red-50 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={submitStatus.status === 'loading'}
              className={`w-full ${
                submitStatus.status === 'loading' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white py-3 rounded-lg font-semibold transition duration-300 transform hover:translate-y-[-2px]`}
            >
              {submitStatus.status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('opacity-0');
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-5"></div>
        <nav className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 animate-float text-indigo-400" />
              <span className="text-xl font-bold tracking-tight">SnapStay</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="https://www.fiverr.com//fridaydeployers/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <span>Hire us on Fiverr</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-indigo-300 transition-colors duration-300">Services</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-indigo-300 transition-colors duration-300">Projects</a>
              <a href="#team" onClick={(e) => scrollToSection(e, 'team')} className="hover:text-indigo-300 transition-colors duration-300">Team</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-indigo-300 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </nav>
        
        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-3xl animate-rotate-in">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-indigo-400" />
              <span className="text-indigo-300 tracking-wide">Premium Development Agency</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight tracking-tight">
              We Build Amazing
              <br />
              Digital Solutions
            </h1>
            <p className="text-xl mb-8 text-slate-300 leading-relaxed">A team of passionate full-stack developers turning your ideas into reality.</p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="group bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 flex items-center button-3d"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg font-semibold border border-indigo-400/30 hover:bg-indigo-500/10 transition duration-300 button-3d"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </header>



      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll">
            <h1 className="text-5xl font-bold mb-4 text-slate-900 ">Our Services</h1>
            <p className="text-slate-600 max-w-3xl mx-auto text-2xl">
              We offer comprehensive development solutions tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="service-card p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 animate-on-scroll">
              <div className="bg-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Web Development</h3>
              <p className="text-slate-600">Custom web applications built with modern technologies and best practices.</p>
            </div>
            <div className="service-card p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 animate-on-scroll">
              <div className="bg-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Laptop className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Mobile Development</h3>
              <p className="text-slate-600">Cross-platform mobile applications that work seamlessly on all devices.</p>
            </div>
            <div className="service-card p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 animate-on-scroll">
              <div className="bg-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Technical Consulting</h3>
              <p className="text-slate-600">Expert advice on architecture, technology stack, and best practices.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-4 text-slate-900">Our Projects</h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-2xl">
              Explore our latest work and see how we've helped other clients achieve their goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="perspective-card bg-white rounded-xl overflow-hidden shadow-lg animate-on-scroll"
              >
                <div className="relative">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {project.status && (
                    <div className="absolute top-4 right-4 status-badge text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      {project.status}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-sm px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.link}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Team Section */}
      <section id="team" className="py-32 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl font-bold mb-4 text-white">Meet Our Team</h2>
            <p className="text-slate-300 max-w-4xl mx-auto text-2xl">
              Expert developers with years of experience in delivering high-quality solutions
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card bg-white p-8 rounded-xl shadow-lg animate-on-scroll"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-32 h-32 rounded-xl mx-auto mb-6 object-cover ring-2 ring-indigo-500/50 ${member.name === "Ankit" ? "rotate-270" : ""}`}
                  />
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-1/2 translate-x-16 bg-indigo-500 p-2 rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-slate-900">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <div className="flex justify-between text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <span>{member.projects} Projects</span>
                  <span>{member.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm/>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">SnapStay</span>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <a 
                href="https://www.fiverr.com//fridaydeployers/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
              >
                <span>Hire us on Fiverr</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="text-slate-400">
                &copy; {new Date().getFullYear()} SnapStay. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;