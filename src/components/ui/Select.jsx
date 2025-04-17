"use client"

import React, { useState, useRef, useEffect } from "react"

export function Select({ children, onValueChange, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [selectedLabel, setSelectedLabel] = useState("")
  const selectRef = useRef(null)

  // Close the select when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Find the label for the default value
  useEffect(() => {
    const childArray = React.Children.toArray(children)
    if (childArray.length > 0 && childArray[0].type === SelectContent) {
      const contentChildren = React.Children.toArray(childArray[0].props.children)
      const selectedItem = contentChildren.find((child) => child.props.value === defaultValue)
      if (selectedItem) {
        setSelectedLabel(selectedItem.props.children)
      }
    }
  }, [children, defaultValue])

  return (
    <div className="select" ref={selectRef}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            selectedLabel,
          })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: (value, label) => {
              setSelectedValue(value)
              setSelectedLabel(label)
              setIsOpen(false)
              onValueChange(value)
            },
          })
        }
        return child
      })}
    </div>
  )
}

export function SelectTrigger({ children, onClick, selectedLabel, id }) {
  return (
    <div className="select-trigger" onClick={onClick} id={id}>
      {selectedLabel || children}
    </div>
  )
}

export function SelectContent({ children, isOpen, onSelect }) {
  return (
    <div className={`select-content ${isOpen ? "open" : ""}`}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect,
          })
        }
        return child
      })}
    </div>
  )
}

export function SelectItem({ children, value, onSelect }) {
  return (
    <div className="select-item" onClick={() => onSelect(value, children)}>
      {children}
    </div>
  )
}

export function SelectValue({ placeholder }) {
  return placeholder
}
