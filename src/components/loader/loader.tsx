import { motion } from "framer-motion"
import styles from "./loader.module.css"

const LoadingAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  )
}

const RotatingSquares = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          style={{
            width: 20,
            height: 20,
            backgroundColor: "#4A90E2",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.25,
          }}
        />
      ))}
    </div>
  )
}

const Loader = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingAnimation>
      <div className={styles.content}>{children}</div>
      <div className={styles.loader}>
        <RotatingSquares />
      </div>
    </LoadingAnimation>
  )
}

export default Loader
