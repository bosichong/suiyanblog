import config from '../config';
import CustomLink from './Link';

const AboutMe = () => {
  return (
    <div className="mb-8 flex justify-between items-center text-sm text-text-secondary">
      <span>{config.ABOUT_ME}  <CustomLink href="https://www.suiyan.cc" underline={true}>
                        关于我 →
                    </CustomLink></span>
      
    </div>
  );
};

export default AboutMe;