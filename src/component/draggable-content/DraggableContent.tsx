import { DragEvent, ReactNode, useState } from "react";
import style from "./module/DraggableContent.module.css";

type DraggableContentProps = {
  items: ReactNode[]  
};

export default function DraggableContent({
items
}:DraggableContentProps) {
  const [dragging, setDragging] = useState<Node | null>(null)
  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!dragging) {
      return
    }
    const getDragAfter = dragAfter(e.currentTarget, e.clientY)
    if (getDragAfter === null) {
        e.currentTarget.appendChild(dragging)
    } else {
        e.currentTarget.insertBefore(dragging, getDragAfter.element)
    }
  }

  const dragAfter = (container: HTMLDivElement, y:number) => {
    const draggableElement = [...container.querySelectorAll(`.${style["draggable-item"]}:not(.${style.dragging})`)]
    return draggableElement.reduce((acc, element:any) => {
      let box = element.getBoundingClientRect()
      let offset = y - box.top - box.height / 2
      if (offset < 0 && offset > acc.offset) {
        return { offset, element }
      } else {
        return acc
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null})
  }
  return (
    <div className={style.container}>
      <div className={style["draggable-container"]} onDragOver={e=> dragOver(e)}>
        {
          items.map((item, index) => (
            <p key={index} draggable={true} onDragStart={e => {
              e.currentTarget.classList.add(style.dragging)
              setDragging(e.currentTarget)
            }} onDragEnd={e => {
              e.currentTarget.classList.remove(style.dragging)
              setDragging(null)
            }} className={style["draggable-item"]}>
              {item}
            </p>
          ))
        }
      </div>
      <div className={style["draggable-container"]} onDragOver={e => dragOver(e)}>
      </div>
    </div>
  );
}
