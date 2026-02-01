import config from '../config';

const AboutMe = () => {
  return (
    <div className="mb-8 flex justify-between items-center text-sm text-text-secondary">
      <span>{config.ABOUT_ME}  <a 
        href="/blog/1" 
        className="text-blue-400 hover:text-orange-600 hover:underline font-medium"
      >
        关于我 →
      </a></span>
      
    </div>
  );
};

export default AboutMe;