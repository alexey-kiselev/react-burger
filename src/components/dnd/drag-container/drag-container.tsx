import { ReactNode } from "react"
import { useDrag } from "react-dnd"
import { IBurgerIngredientItem, IBurgerItemDragItem } from "../../../services/types"

interface IDragContainerProps {
  ingredient: IBurgerIngredientItem
  constructorIngredientIndex: number | null
  children: ReactNode
  dragType: "bun" | "middle_ingredient" | "bun_filled" | "middle_ingredient_filled"
}

export default function DragContainer({
  ingredient,
  constructorIngredientIndex = null,
  children,
  dragType,
}: IDragContainerProps): JSX.Element {
  const [{ isDragging }, refDrag] = useDrag({
    type: dragType,
    item: {
      ingredient: ingredient,
      constructorIngredientIndex: constructorIngredientIndex,
    } satisfies IBurgerItemDragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={refDrag} style={{ opacity: isDragging ? 0.5 : 1.0 }}>
      {children}
    </div>
  )
}
