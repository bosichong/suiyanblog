import config from '../config';

const AboutMe = () => {
  return (
    <div className="mb-8 p-6 rounded-lg border border-border">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{config.ABOUT_ME}</p>
        <div className="mt-4 text-right">
          <a 
            href="/blog/1" 
            className="text-text-link hover:text-text-link-hover hover:underline font-medium"
          >
            关于我 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;