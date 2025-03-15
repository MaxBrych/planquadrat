"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, ChevronLeft, ChevronRight, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShortsCarousel from "@/components/shorts-carousel"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { AudioPlayer } from "@/components/audio-player"
import ArrowBottom from "@/components/svg/02"
import ArrowTop from "@/components/svg/01"



export default function Home() {
  const heroRef = useRef(null)
  const mapRef = useRef(null)
  const shortsRef = useRef(null)
  const instagramRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2])
  const heroImageRotate = useTransform(scrollYProgress, [0, 0.2], [0, 10])

  const mapOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 1])
  const mapScale = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.8, 1, 1])

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 })
  const isShortsInView = useInView(shortsRef, { once: false, amount: 0.3 })
  const isInstagramInView = useInView(instagramRef, { once: false, amount: 0.3 })

  // Parallax effect for texture background
  const textureY = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f3e9] w-screen overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]">
      <motion.header
        className="container mx-auto py-4 border-b border-[#e0d9cc] h-[64px] bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')] flex items-center justify-between overflow-hidden"
        
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div className="font-medium text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Planquadrat
        </motion.div>
        <nav className="hidden md:flex items-center space-x-6">
          {["Was wir machen", "Shorts", "Folgen"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm hover:underline">
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="rounded-full text-sm px-6">
            Kontakt
          </Button>
        </motion.div>
       
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="container mx-auto py-16 md:py-24 relative h-[720px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedSection direction="left" delay={0.2} className="space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl max-w-[560px] font-serif leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Wir reisen durch ganz MV und nehmen{" "}
                <motion.span
                  className="text-[#ff0066] relative inline-block"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  dich
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 100 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path
                      d="M1 5.5C20 0.5 50 0.5 99 5.5"
                      stroke="#ff0066"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.svg>
                </motion.span>{" "}
                mit
              </motion.h1>
              <motion.p
                className="text-gray-600 max-w-md"
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
              </motion.p>
              <motion.div
                                className="flex space-x-4 items-center"

                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                 <AudioPlayer audioSrc="/audio.mp3" />
               
              
              </motion.div>
            </AnimatedSection>
            <div className="relative h-80 md:h-96">
              <motion.div
                className="absolute top-0 right-0 w-full h-full md:w-[120%] md:-right-[10%]"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={isHeroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={{ scale: heroImageScale, rotate: heroImageRotate }}
              >
                <div className="relative w-full h-full">
                 
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src="/hero.png"
                      alt="Christian und Christian"
                      width={500}
                      height={500}
                      className="w-[480px] h-[480px] object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute top-[10%] left-[10%] text-white font-medium rotate-[-15deg] text-[#ff0066]"
                    
                    animate={{
                      y: [0, -10, 0],
                      rotate: [-15, -12, -15],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    
                   <ArrowTop/>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-[10%] right-[10%] text-white font-medium rotate-[15deg] text-[#ff0066]"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [15, 18, 15],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <ArrowBottom/>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
      
        </section>

        {/* Was wir machen Section with Map */}
        <section
          ref={mapRef}
          id="was-wir-machen"
          className="bg-[#ffcc00] py-16 md:py-24 relative h-[720px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/02.png')]"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection direction="up" className="space-y-6 z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  Was wir machen
                </motion.h2>
                <motion.p
                  className="text-gray-800 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={isMapInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </motion.p>
              </AnimatedSection>
              <AnimatedSection direction="down" delay={0.3} className="flex justify-end items-start space-x-12 z-10">
                {[
                  { number: "9000", label: "Quadrate" },
                  { number: "2", label: "Freunde" },
                  { number: "1", label: "Bundesland" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="text-4xl font-bold"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      {item.number}
                    </motion.div>
                    <div className="text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </AnimatedSection>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 opacity-40 z-0 bg-center bg-no-repeat bg-contain "
            style={{
              backgroundImage: "url('/bg.png')",
              backgroundPosition: "center",
              opacity: mapOpacity,
              scale: mapScale,
            }}
          ></motion.div>
        
        </section>

        {/* Shorts Section */}
        <section ref={shortsRef} id="shorts" className="bg-[#ff0066] py-16 md:py-24 h-[880px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/03.png')]">
        
          <div className="container mx-auto">
            <AnimatedSection direction="up" className="flex justify-between items-center mb-8">
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-serif text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isShortsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Shorts
                </motion.h2>
                <motion.p
                  className="text-white/80 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={isShortsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                </motion.p>
              </div>
              <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={isShortsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    id="prev-button"
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white text-[#ff0066] hover:bg-white/90"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    id="next-button"
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white text-[#ff0066] hover:bg-white/90"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedSection>

            <AnimatePresence>
              {isShortsInView && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ShortsCarousel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* About Us Section */}
        <section ref={instagramRef} id="folgen" className="bg-[#f8f3e9] py-16 md:py-24 h-[720px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection direction="left" className="space-y-6">
                <motion.h2
                  className="text-3xl md:text-4xl font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInstagramInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Was wir machen
                </motion.h2>
                <motion.p
                  className="text-gray-600 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={isInstagramInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInstagramInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                 
                >
                  <Link
                    href="https://instagram.com"
                    className="inline-flex items-center text-black bg-white rounded-full px-6 h-10 hover:scale-120 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="mr-2 text-[#ff0066]" size={20} />
                    Jetzt folgen
                  </Link>
                </motion.div>
              </AnimatedSection>
              <div className="relative h-96">
                <AnimatePresence>
                  {isInstagramInView && (
                    <>
                      <motion.div
                        className="absolute w-[80%] h-[60%] top-0 right-0 transform rotate-6"
                        initial={{ opacity: 0, x: 100, rotate: 12 }}
                        animate={{ opacity: 1, x: 0, rotate: 6 }}
                        transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
                        whileHover={{ rotate: 8, scale: 1.02 }}
                      >
                        <Image
                          src="/portraits/01.png"
                          alt="Instagram photo 1"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover border-8 border-white shadow-lg"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute w-[60%] h-[50%] top-[30%] right-[30%] transform -rotate-3 z-10"
                        initial={{ opacity: 0, x: -100, rotate: -8 }}
                        animate={{ opacity: 1, x: 0, rotate: -3 }}
                        transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
                        whileHover={{ rotate: -5, scale: 1.02 }}
                      >
                        <Image
                          src="/portraits/02.png"
                          alt="Instagram photo 2"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover border-8 border-white shadow-lg"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute w-[40%] h-[40%] bottom-0 left-[20%] transform rotate-[-8deg] z-20"
                        initial={{ opacity: 0, y: 100, rotate: -15 }}
                        animate={{ opacity: 1, y: 0, rotate: -8 }}
                        transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
                        whileHover={{ rotate: -10, scale: 1.02 }}
                      >
                        <Image
                          src="/portraits/03.png"
                          alt="Instagram photo 3"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover border-8 border-white shadow-lg"
                        />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
       
        </section>
      </main>

      <motion.footer
        className="border-t border-[#e0d9cc] py-6 overflow-hidden relative bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto flex justify-center md:justify-between items-center">
          <div className="text-sm text-gray-500 flex space-x-4">
            <motion.div whileHover={{ scale: 1.05, color: "#ff0066" }}>
              <Link href="/datenschutz" className="hover:underline">
                Datenschutz
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, color: "#ff0066" }}>
              <Link href="/impressum" className="hover:underline">
                Impressum
              </Link>
            </motion.div>
          </div>
        </div>
      
      </motion.footer>
    </div>
  )
}

