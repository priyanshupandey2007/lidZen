import { motion } from 'framer-motion';

type StepCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

export default function StepCard({ icon, title, description, index }: StepCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-3 text-indigo-600">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}
