import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function AnimatedNumber({ value, prefix = "$" }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span>
      {display}
    </motion.span>
  );
}

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  prefix: PropTypes.string,
};
