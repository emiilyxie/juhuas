import Link from 'next/link'
 
function Flowers(props : { flowers : string[] } ) {
  const { flowers } = props

  return (
    <ul>
      {flowers.map((flower) => (
        <li key={flower}>
          <Link href={`/${flower}`}>{flower}</Link>
        </li>
      ))}
    </ul>
  )
}
 
export default Flowers