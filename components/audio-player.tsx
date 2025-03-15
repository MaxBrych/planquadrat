"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  audioSrc: string
  className?: string
}

export function AudioPlayer({ audioSrc, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    
    const handleCanPlay = () => {
      setIsLoading(false)
      setDuration(audio.duration)
    }
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    
    return () => {
      audio.pause()
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioSrc])

  const togglePlayPause = () => {
    if (isLoading) return
    
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    
    setIsPlaying(!isPlaying)
    
    // Auto-expand when playing
    if (!isPlaying && !isExpanded) {
      setIsExpanded(true)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return
    
    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={cn("relative", className)}>
      <motion.div 
        className={cn(
          "flex items-center gap-2 rounded-full",
          isExpanded ? "bg-white shadow-lg" : ""
        )}
        animate={{ 
          width: isExpanded ? 'auto' : 'auto',
          paddingRight: isExpanded ? 16 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={togglePlayPause}
            className={cn(
              "rounded-full bg-[#ff0066] hover:bg-[#e00058] text-white flex items-center gap-2 relative overflow-hidden",
              isPlaying && "pr-4"
            )}
            disabled={isLoading}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Pause size={16} className="fill-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Play size={16} className="fill-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <span className="mr-1 relative z-10 font-roboto">
              
              {isPlaying ? "Pause" : "Erzähl mir mehr"}
            </span>
            
            {isPlaying && (
              <motion.div 
                className="absolute left-0 top-0 h-full bg-[#e00058]"
                style={{ 
                  width: `${(currentTime / duration) * 100}%`,
                  zIndex: 0
                }}
                transition={{ duration: 0.1 }}
              />
            )}
          </Button>
        </motion.div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="h-1 bg-gray-200 rounded-full w-32 cursor-pointer relative"
                onClick={handleProgressClick}
                ref={progressRef}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-[#ff0066] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 w-16">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              <motion.button
                onClick={toggleMute}
                className="text-gray-500 hover:text-[#ff0066] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {!isExpanded && isPlaying && (
        <motion.div 
          className="absolute -bottom-6 left-0 text-xs text-gray-500"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </motion.div>
      )}
    </div>
  )
}
