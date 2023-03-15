import { AiFillHome } from 'react-icons/ai';
import { motion } from 'framer-motion';

function Workspace() {
    return (
      <motion.div className="bg-gradient-to-r from-green-600 to-green-800 h-screen" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/>
        <h1 className="text-white text-4xl text-center">Workspace</h1>
      </motion.div>
    )
  }
  
  export default Workspace;