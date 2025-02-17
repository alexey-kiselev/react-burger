import { useDrop } from "react-dnd"
import {
  addMiddleIngredientToBottom,
  addMiddleIngredientToTop,
  changeMiddleIngredientByIndex,
  changeMiddleIngredientsByIndexes,
  setBurgerBun,
} from "../../../services/burger-constructor"
import { useAppDispatch } from "../../../services/hooks"
import { IBurgerItemDragItem } from "../../../services/types"

interface IDropContainerProps {
  ingredientType:
    | "bun_top"
    | "middle_ingredient_to_top"
    | "middle_ingredient_filled"
    | "middle_ingredient_to_bottom"
    | "bun_bottom"
  children: React.ReactNode
  constructorIngredientIndex?: number | null
  dropType: "bun" | "middle_ingredient" | "bun_filled" | "middle_ingredient_filled"
}

export default function DropContainer({
  ingredientType,
  children,
  constructorIngredientIndex = null,
  dropType,
}: IDropContainerProps): JSX.Element {
  const dispatch = useAppDispatch()

  const [{ isOver }, refDrop] = useDrop({
    accept: dropType,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: IBurgerItemDragItem) => {
      if (ingredientType.startsWith("bun")) {
        dispatch(setBurgerBun(item.ingredient))
      } else if (ingredientType === "middle_ingredient_to_top") {
        dispatch(addMiddleIngredientToTop(item.ingredient))
      } else if (ingredientType === "middle_ingredient_to_bottom") {
        dispatch(addMiddleIngredientToBottom(item.ingredient))
      } else if (ingredientType === "middle_ingredient_filled") {
        if (item.constructorIngredientIndex === null && constructorIngredientIndex !== null) {
          dispatch(changeMiddleIngredientByIndex({ ingredient: item.ingredient, index: constructorIngredientIndex }))
        } else if (item.constructorIngredientIndex !== null && constructorIngredientIndex !== null) {
          dispatch(
            changeMiddleIngredientsByIndexes({
              fromIndex: item.constructorIngredientIndex,
              toIndex: constructorIngredientIndex,
            })
          )
        }
      }
    },
  })

  return (
    <div ref={refDrop} style={{ opacity: isOver ? 0.5 : 1.0 }}>
      {children}
    </div>
  )
}
