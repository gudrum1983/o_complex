import ReviewCard from "@/components/ReviewCard/ReviewCard";
import DOMPurify from "@/lib/serverSanitize";
import styles from "./ReviewsList.module.css"

export default async function ReviewsList() {

  const data = await fetch('http://o-complex.com:1337/reviews')
  const reviews = await data.json()
/*  reviews.push({
    "id": 4,
    "text": "<h1>Неплохо crhbgn</h1><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p><p>Есть небольшие проблемы с упаковкой, но в целом нормально.</p>"
  })*/

  const clean = (text: string) => DOMPurify.sanitize(text, {ALLOWED_TAGS: ['p', '#text'],})

  return (
    <ul className={styles.ReviewsList}>
      {reviews.map((review: {
        id: number,
        text: string
      }) => (
        <li key={review.id}><ReviewCard html={clean(review.text)}/></li>
      ))}
    </ul>
  )

}
