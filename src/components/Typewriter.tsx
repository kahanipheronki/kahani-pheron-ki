import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Typewriter({ texts, className = '' }: { texts: string[]; className?: string }) {
  const [currentText, setCurrentText] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentText]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setCurrentText((prev) => (prev + 1) % texts.length)
    } else {
      const speed = isDeleting ? 30 : 60
      timeout = setTimeout(() => {
        setDisplayed(
          isDeleting ? text.substring(0, displayed.length - 1) : text.substring(0, displayed.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentText, texts])

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-text-bottom"
      />
    </span>
  )
}
