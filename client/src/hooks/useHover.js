import { useState, useEffect, useRef } from "react"

const useHover = () => {
    const [hover, setHover] = useState(false)
    const ref = useRef(null)

    const enter = () => setHover(true)
    const leave = () => setHover(false)

    useEffect(() => {
        ref.current.addEventListener("mouseenter", enter)
        ref.current.addEventListener("mouseleave", leave)
        return () => {
            ref.current.removeEventListener("mouseenter", enter)
            ref.current.removeEventListener("mouseleave", leave)
        }
    }, [])

    return [hover, ref]
}

export default useHover