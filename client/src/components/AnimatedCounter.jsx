import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

// Counts up from 0 to `value` once it scrolls into view.
export default function AnimatedCounter({ value, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  const displayRef = useRef(null);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest).toLocaleString();
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>0</span>
      {suffix}
    </motion.span>
  );
}
