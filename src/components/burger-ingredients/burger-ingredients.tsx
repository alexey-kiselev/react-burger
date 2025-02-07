import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"
import { useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients"
import { IBurgerIngredientGroup } from "../../services/types"
import styles from "./burger-ingredients.module.css"
import BurgerIngredientsGroup from "./ingredients-group/ingredients-group"

const groups: IBurgerIngredientGroup[] = [
  { title: "Булки", type: "bun" },
  { title: "Соусы", type: "sauce" },
  { title: "Начинки", type: "main" },
]

export default function BurgerIngredients() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)

  const ingredients = useAppSelector(selectIngredients)

  const refGroupsContainer = useRef<HTMLDivElement | null>(null)

  const groupHeadersRef = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ]

  const onScroll = () => {
    if (!refGroupsContainer.current) {
      return
    }
    let minimalDistanceToContainerTop = -1
    let currentHeaderIndex = 0
    const { top: containerTop } = refGroupsContainer.current.getBoundingClientRect()
    groupHeadersRef.forEach((headerRef, index) => {
      if (!headerRef.current) {
        return
      }
      const { top: headerTop } = headerRef.current.getBoundingClientRect()
      const distanceToContainerTop = Math.abs(headerTop - containerTop)
      if (distanceToContainerTop < minimalDistanceToContainerTop || minimalDistanceToContainerTop === -1) {
        minimalDistanceToContainerTop = distanceToContainerTop
        currentHeaderIndex = index
      }
    })
    setCurrentGroupIndex(currentHeaderIndex)
  }

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tabs}>
        {groups.map((group, index) => (
          <Tab
            value={group.type}
            active={currentGroupIndex === index}
            onClick={() => {
              setCurrentGroupIndex(index)
              groupHeadersRef[index].current?.scrollIntoView()
            }}
            key={group.type}
          >
            {group.title}
          </Tab>
        ))}
      </div>
      <div className={styles.groups} onScroll={onScroll} ref={refGroupsContainer}>
        {groups.map((group, index) => (
          <BurgerIngredientsGroup
            headerRef={groupHeadersRef[index]}
            group={group}
            ingredients={ingredients.filter((ingredient) => ingredient.type === group.type)}
            key={group.type}
          />
        ))}
      </div>
    </div>
  )
}
