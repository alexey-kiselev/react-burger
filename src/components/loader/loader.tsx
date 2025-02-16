import { motion } from "framer-motion"
import styles from "./loader.module.css"

interface ILoadingAnimationProps {
  children: React.ReactNode
}

function LoadingAnimation({ children }: ILoadingAnimationProps): JSX.Element {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  )
}

function RotatingSquares(): JSX.Element {
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

interface ILoaderProps {
  children: React.ReactNode
}

export default function Loader({ children }: ILoaderProps): JSX.Element {
  return (
    <LoadingAnimation>
      <div className={styles.content}>{children}</div>
      <div className={styles.loader}>
        <RotatingSquares />
      </div>
    </LoadingAnimation>
  )
}
