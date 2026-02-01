import config from '../config';
import CustomLink from './Link';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <motion.div
      className="mb-8 flex justify-between items-center text-sm text-text-secondary"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <span>{config.ABOUT_ME}  <CustomLink href="https://www.suiyan.cc" underline={true}>
                        关于我 →
                    </CustomLink></span>
    </motion.div>
  );
};

export default AboutMe;