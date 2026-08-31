import { Children, cloneElement } from 'react';
import { motion } from 'framer-motion';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } }),
};

// Wraps a grid/list whose children are often added asynchronously (e.g. after an API
// fetch resolves). Each StaggerItem below observes its OWN visibility independently —
// relying on a parent-level whileInView here previously meant that if the parent's
// trigger fired before the data arrived (a real race with variable network/API latency),
// items added afterward never received the "show" signal and stayed invisible forever.
export function StaggerGroup({ children, className = '' }) {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => cloneElement(child, { __staggerIndex: i }))}
    </div>
  );
}

export function StaggerItem({ children, className = '', __staggerIndex = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={Math.min(__staggerIndex, 8) * 0.08}
      variants={item}
    >
      {children}
    </motion.div>
  );
}
