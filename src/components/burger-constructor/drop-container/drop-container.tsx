import { useDrop } from "react-dnd"
import {
  addMiddleIngredientToBottom,
  addMiddleIngredientToTop,
  changeMiddleIngredientByIndex,
  setBurgerBun,
} from "../../../services/burger-constructor/reducers"
import { useAppDispatch } from "../../../services/hooks"
import { IBurgerIngredientItem } from "../../../services/types"

export default function DropContainer({
  ingredientType,
  children,
  constructorIngredientIndex,
}: {
  ingredientType:
    | "bun_top"
    | "middle_ingredient_to_top"
    | "middle_ingredient_filled"
    | "middle_ingredient_to_bottom"
    | "bun_bottom"
  children: React.ReactNode
  constructorIngredientIndex: number | null
}) {
  const dispatch = useAppDispatch()

  const [{ isOver }, refDrop] = useDrop({
    accept: ingredientType.startsWith("middle_ingredient") ? "middle_ingredient" : "bun",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (ingredient: IBurgerIngredientItem) => {
      if (ingredientType.startsWith("bun")) {
        dispatch(setBurgerBun(ingredient))
      } else if (ingredientType === "middle_ingredient_to_top") {
        dispatch(addMiddleIngredientToTop(ingredient))
      } else if (ingredientType === "middle_ingredient_to_bottom") {
        dispatch(addMiddleIngredientToBottom(ingredient))
      } else if (ingredientType === "middle_ingredient_filled") {
        dispatch(changeMiddleIngredientByIndex({ ingredient: ingredient, index: constructorIngredientIndex! }))
      }
    },
  })

  return (
    <div ref={refDrop} style={{ opacity: isOver ? 0.5 : 1.0 }}>
      {children}
    </div>
  )
}

DropContainer.defaultProps = {
  constructorIngredientIndex: null,
}
