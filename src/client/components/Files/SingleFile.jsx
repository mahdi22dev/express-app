import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { EditVariants, ScaleVariants } from "../../lib/variants";
import { toggleviewPDF } from "../../lib/redux/User/userSlice";
import { FaBookReader } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { updateFileId } from "../../lib/redux/files/filesSlice";
import img from "../../assets/img.jpg";
function SingleFile({ file }) {
  const MotionFaBookReader = motion(FaBookReader);
  const [scaleAnimation, setScaleAnimation] = useState(false);
  const dispatch = useDispatch();

  const handleViewrToggle = (id) => {
    dispatch(updateFileId(id));
    dispatch(toggleviewPDF());
    setScaleAnimation(false);
  };

  const handleHover = () => {
    setScaleAnimation(true);
  };

  const handleLeave = () => {
    setScaleAnimation(false);
  };

  return (
    <div
      className='relative bg-primary max-h-96 max-w-sm cursor-pointer overflow-hidden p-5 '
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* <div className='w-full p-3 py-2 bg-green-500 text-center '>
        <p>{decodedFileName}</p>
      </div> */}
      <img src={img} alt='img' className='w-full h-full' />
      <AnimatePresence>
        <motion.div
          layout
          variants={ScaleVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={scaleAnimation}
          className={`${
            scaleAnimation
              ? "absolute flex justify-center items-center"
              : "hidden"
          }  top-0 bottom-0 right-0 left-0 overflow-hidden overflow-x-hidden w bg-black/30 z-[100] `}
          onClick={() => handleViewrToggle(file.id)}
        >
          <MotionFaBookReader
            className='[font-size:_clamp(15px,4vw,40px)] text-primary gridIcon'
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            key={scaleAnimation}
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          layout
          variants={EditVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={scaleAnimation}
          className={`${
            scaleAnimation
              ? "absolute flex justify-center items-center"
              : "hidden"
          }  top-4 right-2 overflow-hidden overflow-x-hidden z-[100] `}
        >
          <FiEdit
            className='[font-size:_clamp(15px,4vw,40px)] text-primary gridIcon'
            onClick={() => console.log("edit clicked")}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SingleFile;
