import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { IBurgerConstructor } from '../burger-constructor/burger-constructor'
import styles from './burger-ingredients.module.css'
import BurgerIngredientsGroup from './ingredients-group/ingredients-group'

export interface IBurgerIngredientItem {
  _id: string, type: string, name: string, price: number, image: string
}
export interface IBurgerIngredientGroup { type: string, title: string }

export default function BurgerIngredients({ ingredients, groups, burgerConstructor }: {
  ingredients: IBurgerIngredientItem[],
  groups: IBurgerIngredientGroup[],
  burgerConstructor: IBurgerConstructor
}) {
  const [currentGroup, setCurrentGroup] = useState(groups[0].type)
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tabs}>
        {
          groups.map((group) => (
            <Tab
              value={group.type}
              active={currentGroup === group.type}
              onClick={setCurrentGroup}
              key={group.type}
            >
              {group.title}
            </Tab>
          ))
        }
      </div>
      <div className={styles.groups}>
        {
          groups.map((group) => (
            <BurgerIngredientsGroup
              group={group}
              ingredients={ingredients.filter((ingredient) => ingredient.type === group.type)}
              burgerConstructor={burgerConstructor}
              key={group.type}
            />
          ))
        }
      </div>
    </div>
  )
}
