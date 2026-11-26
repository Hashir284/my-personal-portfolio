import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi'

/** Full-screen, keyboard-accessible image viewer used by the certificates grid. */
export default function ImageLightbox({ image, title, caption, onClose }) {
  const [zoomed, setZoomed] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ scale: 0.94, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line/20 bg-surface"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line/10 px-4 py-3">
          <p className="truncate font-medium">{caption || title}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              className="grid h-9 w-9 place-items-center rounded-full border border-line/20 hover:border-accent"
            >
              {zoomed ? <FiZoomOut /> : <FiZoomIn />}
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-line/20 hover:border-accent"
            >
              <FiX />
            </button>
          </div>
        </div>
        <div className="overflow-auto bg-bg p-2">
          <img
            src={image}
            alt={title}
            style={{ width: zoomed ? '200%' : '100%', maxWidth: zoomed ? 'none' : '100%' }}
            className="mx-auto block h-auto transition-[width] duration-300"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
