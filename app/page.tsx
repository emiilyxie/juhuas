import Link from 'next/link'
import { FlowerTypes } from "@/lib/types";

export default function Home() {
    
  return (
    <>
      <div>hi welcome</div>
      { Object.keys(FlowerTypes).map(f => <Link href={f} key={f}><div>{f}</div></Link>) }
    </>
  )
}