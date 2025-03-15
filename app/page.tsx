"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Instagram, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShortsCarousel from "@/components/shorts-carousel"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useDragControls } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { AudioPlayer } from "@/components/audio-player"
import { useMobile } from "@/hooks/use-mobile"
import ArrowTop from "@/components/svg/01"
import ArrowBottom from "@/components/svg/02"

export default function Home() {
  const heroRef = useRef(null)
  const mapRef = useRef(null)
  const shortsRef = useRef(null)
  const instagramRef = useRef(null)
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2])
  const heroImageRotate = useTransform(scrollYProgress, [0, 0.2], [0, 10])

  const mapOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 1])
  const mapScale = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.8, 1, 1])

  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 })
  const isShortsInView = useInView(shortsRef, { once: false, amount: 0.3 })
  const isInstagramInView = useInView(instagramRef, { once: false, amount: 0.3 })

  const controls = useDragControls()

  // Parallax effect for texture background
  const textureY = useTransform(scrollYProgress, [0, 1], [0, 300])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f3e9] w-screen overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]">
      <motion.header
        className="container mx-auto py-4 border-b border-[#e0d9cc] h-[64px] bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')] flex items-center justify-between overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div className="font-bold " whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Planquadrat
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Was wir machen", "Shorts", "Folgen"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm hover:underline font-roboto"
                onClick={handleNavLinkClick}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={toggleMobileMenu}
            className="p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="rounded-full bg-white text-sm px-6 font-roboto">
            Kontakt
          </Button>
        </motion.div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#f8f3e9] z-50 pt-20 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 items-center ">
              {["Was wir machen", "Shorts", "Folgen"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="text-xl font-medium"
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-[#ff0066] font-roboto"
                    onClick={handleNavLinkClick}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-6"
              >
                <Button variant="outline" className="rounded-full text-sm px-6 font-roboto">
                  Kontakt
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="container mx-auto py-8 md:py-24 relative min-h-[500px] md:h-[720px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" delay={0.2} className="space-y-6 z-10">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl max-w-[560px] font-robotoSlab leading-tight"
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
                className="text-gray-600 max-w-md text-lg font-roboto"
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
            <div className={`relative ${isMobile ? "h-[320px] mt-8 flex justify-center" : "h-80 md:h-96"}`}>
              <motion.div
                className={`${isMobile ? "relative" : "absolute top-0 right-0 w-full h-full md:w-[120%] md:-right-[10%]"}`}
                initial={{ opacity: 0}}
                animate={isHeroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={isMobile ? {} : { }}
              >
                <div className="relative w-full h-full">
                  <motion.div
                    className={`${isMobile ? "w-[240px] h-[240px]" : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px]"} overflow-hidden`} 
                  >
                    <Image
                      src="/hero.png"
                      alt="Christian und Christian"
                      width={isMobile ? 280 : 480}
                      height={isMobile ? 280 : 480}
                      className={`${isMobile ? "w-[240px] h-[240px]" : "w-[480px] h-[480px]"} object-cover`}
                    />
                  </motion.div>

                  {/* Arrows - shown on both mobile and desktop */}
                  <motion.div
                    className={`${isMobile ? "absolute top-[-5%] left-[-15%] w-[80px]" : "absolute top-[10%] left-[10%]"} text-white font-medium rotate-[-15deg] text-[#ff0066]`}
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
                    <ArrowTop className={isMobile ? "w-[60px] h-auto" : ""} />
                  </motion.div>
                  <motion.div
                    className={`${isMobile ? "absolute bottom-[5%] right-[-15%] w-[100px]" : "absolute bottom-[1%] right-[5%]"} text-white font-medium rotate-[15deg] text-[#ff0066]`}
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
                    <ArrowBottom className={isMobile ? "w-[80px] h-auto" : ""} />
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
          className="bg-[#ffcc00] py-8 md:py-24 relative min-h-[600px] md:h-[800px] overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection direction="up" className="space-y-6 z-10">
                <motion.h2
                  className="text-2xl md:text-4xl font-robotoSlab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  Was wir machen
                </motion.h2>
                <motion.p
                  className="text-gray-800 max-w-md font-roboto"
                  initial={{ opacity: 0 }}
                  animate={isMapInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                  et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </motion.p>
              </AnimatedSection>

              {!isMobile ? (
                // Desktop: Stats in right column
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
                       
                    
                      >
                        {item.number}
                      </motion.div>
                      <div className="text-sm font-roboto">{item.label}</div>
                      
                    </motion.div>
                  ))}
                </AnimatedSection>
              ) : (
                // Mobile: Stats below text
                <AnimatedSection direction="up" delay={0.3} className="flex flex-wrap justify-start gap-8 mt-2 z-10">
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
                        className="text-3xl font-bold"
                      
                      >
                        {item.number}
                      </motion.div>
                      <div className="text-sm font-roboto">{item.label}</div>
                    </motion.div>
                  ))}
                </AnimatedSection>
              )}
            </div>

            {/* Map Image - Background on desktop, regular image on mobile */}
            {!isMobile ? (
              <motion.div
                className="absolute inset-0 opacity-90 z-0 bg-center bg-no-repeat bg-contain"
                style={{
                  backgroundImage: "url('/bg.png')",
                  backgroundPosition: "center",
                 
                }}
              ></motion.div>
            ) : (
              <motion.div
                className="mt-8 mx-auto max-w-md"
                
              >
                <Image
                  src="/bg.png"
                  alt="Map of MV"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Shorts Section - Reduced size */}
        <section
          ref={shortsRef}
          id="shorts"
          className="bg-[#ff0066] py-8 md:py-16 overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/03.png')]"
          style={{ height: isMobile ? "auto" : "720px" }} 
        >
          <div className="container mx-auto">
            <AnimatedSection
              direction="up"
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8"
            >
              <div>
                <motion.h2
                  className="text-2xl md:text-4xl font-robotoSlab text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isShortsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Shorts
                </motion.h2>
                <motion.p
                  className="text-white/80 max-w-md mt-2 font-roboto"
                  initial={{ opacity: 0 }}
                  animate={isShortsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                </motion.p>
              </div>
              <motion.div
                className="flex space-x-2 mt-4 md:mt-0"
                initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
                animate={isShortsInView ? { opacity: 1, x: 0, y: 0 } : {}}
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
                  className="pb-8 md:pb-0" // Add padding on mobile
                >
                  <ShortsCarousel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* About Us Section */}
        <section id="folgen" className="bg-[#f8f3e9] py-8 md:py-24 overflow-hidden bg-center bg-no-repeat bg-cover bg-[url('/bg/01.png')]">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <motion.h2 className="text-2xl md:text-4xl font-robotoSlab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Was wir machen
        </motion.h2>
        <motion.p className="text-gray-600 max-w-md font-roboto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Link href="https://instagram.com" className="inline-flex items-center text-black bg-white font-roboto font-medium text-sm rounded-full px-6 h-10 hover:scale-110 transition-all" target="_blank" rel="noopener noreferrer">
          <Instagram className="mr-2 text-[#ff0066] font-bold font-roboto" size={20} />
            Jetzt folgen
          </Link>
        </motion.div>
      </div>
      <div className="relative h-[400px] flex justify-center items-center">
      {["/portraits/01.png", "/portraits/02.png", "/portraits/03.png"].map((src, index) => (
          <motion.div key={index} className="absolute w-64 h-64 md:w-96 md:h-96" drag dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }} dragElastic={0.1}>
            <Image src={src} alt={`Instagram photo ${index + 1}`} width={160} height={160} className="rounded-xl border-4 border-white shadow-lg" />
          </motion.div>
        ))}
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
              <Link href="/datenschutz" className="hover:underline font-roboto">
              
                Datenschutz
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, color: "#ff0066" }}>
              <Link href="/impressum" className="hover:underline font-roboto">
                Impressum
              </Link>
            </motion.div>
            <Instagram className="mr-2 w-full justify-right items-end font-bold font-roboto" size={20} />
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

