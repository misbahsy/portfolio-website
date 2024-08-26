import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GithubIcon, LinkedinIcon, BookOpenIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react'

const GlowingBorder = ({ children }) => (
  <div className="relative p-1 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-lg"></div>
    <div className="relative bg-gray-900 z-10">
      {children}
    </div>
  </div>
)

const Section = ({ id, title, icon, children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="mb-24"
      id={id}
    >
      <GlowingBorder>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            {React.createElement(icon, { className: "mr-2 h-8 w-8" })}
            {title}
          </h2>
          {children}
        </div>
      </GlowingBorder>
    </motion.section>
  )
}

const ParticleAnimation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => cancelAnimationFrame(animate)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <ParticleAnimation />
      <div className="relative z-10">
        <header className="p-6 sticky top-0 bg-gray-900/80 backdrop-blur-lg">
          <nav>
            <ul className="flex justify-center space-x-6">
              <li><a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a></li>
              <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#education" className="hover:text-blue-400 transition-colors">Education</a></li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-12">
          <Section id="hero" title="Misbah Syed" icon={GithubIcon}>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-4">AI & Machine Learning Expert</h1>
              <p className="text-xl mb-8">Transforming ideas into intelligent solutions</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20">
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </Section>

          <Section id="experience" title="Experience" icon={BriefcaseIcon}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 border-none">
                <CardHeader>
                  <CardTitle>Founder</CardTitle>
                  <p className="text-sm text-gray-300">Menlo Park Lab Corp. | Oct. 2022 – Present</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provided expert consultancy to industry-leading organizations</li>
                    <li>Developed AI Brand Intel and NarratifAI projects</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-none">
                <CardHeader>
                  <CardTitle>Machine Learning Engineer</CardTitle>
                  <p className="text-sm text-gray-300">Advata | Jun. 2022 – Sep. 2022</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Built and maintained ML infrastructure for healthcare AI</li>
                    <li>Developed pyspark ML notebooks on Azure DataBricks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section id="skills" title="Skills" icon={BookOpenIcon}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {['LLM/LLMOps', 'ML/Data Science', 'Full-Stack Web Development'].map((category, index) => (
                <Card key={index} className="bg-white/5 border-none">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{getSkills(category)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education" icon={GraduationCapIcon}>
            <Card className="bg-white/5 border-none">
              <CardHeader>
                <CardTitle>University of South Alabama</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Master&apos;s Degree and Bachelor&apos;s Degree in Chemical Engineering</p>
                <p className="text-sm text-gray-300">Bachelor&apos;s: May 2012 | Master&apos;s: July 2014</p>
              </CardContent>
            </Card>
          </Section>
        </main>

        <footer className="text-center py-6">
          <p>&copy; {new Date().getFullYear()} Misbah Syed. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function getSkills(category) {
  switch (category) {
    case 'LLM/LLMOps':
      return 'LangChain, LangGraph, LangSmith, Llama Index, Flowise, LangFlow'
    case 'ML/Data Science':
      return 'Keras, TensorFlow, Pandas, Spark, Dataiku, Minitab'
    case 'Full-Stack Web Development':
      return 'FastAPI, Flask, ReactJS, Postgres, SQL, REST APIs, AWS, GCP, Azure'
    default:
      return ''
  }
}