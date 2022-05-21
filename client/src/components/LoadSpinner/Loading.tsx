import { CircleNotch } from "phosphor-react";
import '../../components/LoadSpinner/Loading.css'

export function Loading() {
  return(
    <div>
      <h1>Loading ...</h1>
      <CircleNotch size="64" weight="bold" className="animate-spin" />
    </div>
  )
}