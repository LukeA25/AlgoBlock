import { AiFillHome } from 'react-icons/ai';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { motion } from 'framer-motion';

function Workspace() {
    return (
      <motion.div className="bg-gradient-to-r from-green-600 to-green-800 h-screen" /*initial={{width: 0}} animate={{width: "100%"}} exit={{x: window.innerWidth, transition: {duration: 0.1}}}*/>
        <h1 className="text-white text-7xl text-center relative top-8">Workspace</h1>
        <div className='rounded-3xl h-[32rem] w-[80rem] mx-auto relative top-16 bg-shaded-500 border-white border-8 p-16'>
          <div className='rounded-xl h-96 w-64 bg-shaded-750 border-4 border-white'>
            <button>
              <MdOutlineAddCircleOutline size="80" color='white' className='relative top-28 m-auto' />
            </button>
            <h1 className='text-white text-center text-3xl relative top-32 m-auto'>New Strategy</h1>
          </div>
        </div>
      </motion.div>
    )
  }
  
  export default Workspace;