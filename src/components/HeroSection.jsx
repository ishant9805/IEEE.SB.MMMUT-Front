// import { Link } from 'react-router-dom';
import '../styles/global.css';

const HeroSection = () => {
  return (
    <section className="min-h-screen  py-20 px-4 bg-white/20">
      <div className="max-w-6xl mx-auto bg-white/20">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center bg-white/20">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left bg-white/20">
            <h1 className="text-5xl font-bold text-slate-800 mb-4 relative bg-white/20">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ieee-blue to-ieee-red bg-white/20">
                IEEE Student Branch MMMUT
              </span>
              <div className="absolute -bottom-2 left-1/2 md:left-0 transform md:translate-x-0 -translate-x-1/2 w-24 h-1 bg-ieee-blue rounded-full"></div>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Empowering students through innovation, collaboration, and technical excellence. Join us to shape the future of technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="https://www.ieee.org/profile/public/createwebaccount/showCreateAccount.html?car=IEEE-MemApp&url=https%3A%2F%2Fwww.ieee.org%2Fmembership-application%2Fjoin.html%3Fgrade%3DStudent&signinurl=https%3A%2F%2Fwww.ieee.org%2Fmembership-application%2Fjoin.html%3Fgrade%3DStudent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-ieee-blue text-white rounded-lg hover:bg-ieee-blue/90 transition-colors"
              >
                Join IEEE
              </a>
              <a
                href="https://forms.gle/G1JU3FSV93jS1CkT9"
                target='_blank'
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-ieee-blue text-ieee-blue rounded-lg hover:bg-ieee-blue/10 transition-colors"
              >
                Register Here!!
              </a>
            </div>
          </div>

          {/* Right Column - GIF */}
          <div className="order-first md:order-last">
            {/* <img
              src="hero.gif"
              alt="IEEE Activities"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            /> */}

            <video autoPlay loop muted className="w-full max-w-2xl mx-auto rounded-lg shadow-lg">
              <source src="hero02.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold  mb-3 flex items-center text-ieee-blue">
              <span className="mr-2 text-ieee-blue">🚀</span> Innovation Hub
            </h3>
            <p className="text-slate-600">
              Explore cutting-edge technologies and innovative projects.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold  mb-3 flex items-center text-ieee-blue">
              <span className="mr-2 text-ieee-blue">🤝</span> Collaborative Community
            </h3>
            <p className="text-slate-600">
              Join a vibrant community of like-minded tech enthusiasts.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold  mb-3 flex items-center text-ieee-blue">
              <span className="mr-2 text-ieee-blue">💡</span> Technical Workshops
            </h3>
            <p className="text-slate-600">
              Hands-on workshops to enhance your technical skills.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold mb-3 flex items-center text-ieee-blue">
              <span className="mr-2 text-ieee-blue">🌐</span> Global Network
            </h3>
            <p className="text-slate-600">
              Connect with IEEE's global network of professionals and students.
            </p>
          </div>
        </div>

        {/* Subtle Pattern */}
        <div className="mt-20 opacity-10">
          <div className="border-b-2 border-ieee-blue w-24 mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
