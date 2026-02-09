"use client"

import { useEffect } from "react"

const LIGHT_FLOW_ACTIVE = "is-light-flow-active"
const DATA_INIT = "data-card-light-flow-init"

function initCardLightFlow() {
  const cards = document.querySelectorAll(`.card-light-flow:not([${DATA_INIT}])`)
  cards.forEach((el) => {
    el.setAttribute(DATA_INIT, "true")
    el.addEventListener("mouseenter", () => el.classList.add(LIGHT_FLOW_ACTIVE))
    el.addEventListener("mouseleave", (e) => {
      const next = (e as MouseEvent).relatedTarget as Node | null
      if (next && el.contains(next)) return
      el.classList.remove(LIGHT_FLOW_ACTIVE)
    })
  })
}

export function CardLightFlowInit() {
  useEffect(() => {
    initCardLightFlow()
    const observer = new MutationObserver(initCardLightFlow)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])
  return null
}
