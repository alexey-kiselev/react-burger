import './App.css'
import styles from './App.module.css'
import ingredients from './assets/data.json'
import AppHeader from './components/app-header/app-header'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'

const infredientsGroups = [
  { title: "Булки", type: "bun" },
  { title: "Соусы", type: "sauce" },
  { title: "Начинки", type: "main" }
]

const burgerConstructor = {
  "bun": {
    "top": { "_id": "60666c42cc7b410027a1a9b1" }, // Краторная булка N-200i"
    "bottom": { "_id": "60666c42cc7b410027a1a9b1" } // Краторная булка N-200i"
  },
  "ingredients": [
    { "_id": "60666c42cc7b410027a1a9b9" }, // Соус традиционный галактический
    { "_id": "60666c42cc7b410027a1a9b4" }, // Мясо бессмертных моллюсков Protostomi
    { "_id": "60666c42cc7b410027a1a9bc" }, // Плоды Фалленианского дерева
    { "_id": "60666c42cc7b410027a1a9bb" }, // Хрустящие минеральные кольца
    { "_id": "60666c42cc7b410027a1a9bb" } // Хрустящие минеральные кольца
  ]
}

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.content_burger_ingredients}>
            <BurgerIngredients ingredients={ingredients} groups={infredientsGroups} burgerConstructor={burgerConstructor} />
          </div>
          <div className={styles.content_burger_constructor}>
            <BurgerConstructor ingredients={ingredients} burgerConstructor={burgerConstructor} />
          </div>
        </div>
      </div>
    </div>
  )
}
