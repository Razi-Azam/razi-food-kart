import { useEffect, useRef } from 'react'


export default function usePolling(fn, interval = 3000) {
    const saved = useRef()

    useEffect(() => { saved.current = fn }, [fn])

    useEffect(() => {
        let mounted = true
        const tick = async () => { if (mounted && saved.current) await saved.current() }
        tick()
        const id = setInterval(tick, interval)
        return () => { mounted = false; clearInterval(id) }
    }, [interval])
}