import styles from "./ingredient-placeholder.module.css"

export default function IngredientPlaceholder({
  text,
  ingredientType,
}: {
  text: string
  ingredientType: "bun_top" | "middle_ingredient" | "bun_bottom"
}) {
  const placeholderStyles = {
    bun_top: styles.placeholder_top,
    middle_ingredient: styles.placeholder_middle,
    bun_bottom: styles.placeholder_bottom,
  }
  const placeholderClassName = placeholderStyles[ingredientType]

  return (
    <div className={placeholderClassName}>
      <p className={styles.placeholder_text}>{text}</p>
    </div>
  )
}
