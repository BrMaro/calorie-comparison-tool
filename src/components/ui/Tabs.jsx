"use client"

import { useState, createContext, useContext } from "react"

const TabsContext = createContext()

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>
}

export function TabsTrigger({ children, value }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <div className={`tab ${activeTab === value ? "active" : ""}`} onClick={() => setActiveTab(value)}>
      {children}
    </div>
  )
}

export function TabsContent({ children, value }) {
  const { activeTab } = useContext(TabsContext)

  return <div className={`tab-content ${activeTab === value ? "active" : ""}`}>{children}</div>
}
