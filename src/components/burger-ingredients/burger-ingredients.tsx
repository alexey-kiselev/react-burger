import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients/reducers"
import {
  cleanupSelectedIngredient,
  selectSelectedIngredient,
  setSelectedIngredient,
} from "../../services/selected-ingredient/reducers"
import { IBurgerIngredientGroup, IBurgerIngredientItem } from "../../services/types"
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal from "../modal/modal"
import styles from "./burger-ingredients.module.css"
import BurgerIngredientsGroup from "./ingredients-group/ingredients-group"

const groups: IBurgerIngredientGroup[] = [
  { title: "Булки", type: "bun" },
  { title: "Соусы", type: "sauce" },
  { title: "Начинки", type: "main" },
]

export default function BurgerIngredients() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isVisibleIngredientDetails, setIsVisibleIngredientDetails] = useState(false)
  const ingredients = useAppSelector(selectIngredients)
  const selectedIngredient = useAppSelector(selectSelectedIngredient)
  const dispatch = useAppDispatch()

  const refGroupsContainer = useRef<HTMLDivElement | null>(null)

  const groupHeadersRef = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ]

  const handleClickIngredient = (ingredient: IBurgerIngredientItem) => {
    dispatch(setSelectedIngredient(ingredient))
    setIsVisibleIngredientDetails(true)
  }

  const handleCloseDetails = () => {
    setIsVisibleIngredientDetails(false)
    dispatch(cleanupSelectedIngredient())
  }

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
            onClickIngredient={handleClickIngredient}
          />
        ))}
      </div>
      {isVisibleIngredientDetails && (
        <>
          <Modal title="Детали ингредиента" onClose={handleCloseDetails}>
            <IngredientDetails ingredient={selectedIngredient!} />
          </Modal>
          <ModalOverlay />
        </>
      )}
    </div>
  )
}
