"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  /** The static prefix that appears before the typed words — e.g. "Hi, I am Dires" */
  prefix?: string
  /** Words/phrases to rotate through with a typing + deleting effect */
  words: string[]
  /** Typing speed in ms per character */
  typeSpeed?: number
  /** Deleting speed in ms per character */
  deleteSpeed?: number
  /** Pause after finishing a word (ms) */
  pauseAfterWord?: number
  /** Pause after deleting a word (ms) */
  pauseAfterDelete?: number
  /** Optional className for the typed text */
  className?: string
}

/**
 * A typewriter effect that:
 * 1. Types the prefix once (instantly, no animation)
 * 2. Then types/deletes the rotating words in a loop
 *
 * The prefix is rendered with the gradient style; the rotating word is rendered
 * with a warm gradient for visual contrast.
 */
export function TypewriterEffect({
  prefix,
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfterWord = 1800,
  pauseAfterDelete = 300,
  className = "",
}: TypewriterEffectProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing")

  useEffect(() => {
    const currentWord = words[wordIndex]

    let timeout: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
        }, typeSpeed)
      } else {
        // Finished typing — pause then start deleting
        timeout = setTimeout(() => setPhase("deleting"), pauseAfterWord)
      }
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
        }, deleteSpeed)
      } else {
        // Finished deleting — pause then move to next word
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length)
          setPhase("typing")
        }, pauseAfterDelete)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfterWord, pauseAfterDelete])

  return (
    <span className={className}>
      {prefix && <span className="text-foreground">{prefix}</span>}
      {prefix && " "}
      <span className="text-gradient">{displayed}</span>
      <span className="typewriter-caret" aria-hidden />
    </span>
  )
}
