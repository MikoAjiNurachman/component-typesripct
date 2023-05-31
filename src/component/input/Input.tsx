import { SyntheticEvent } from 'react'
import style from './module/Input.module.css'

type InputProps = {
    type: string
    placeHolder: string
    value?: string
    onChange?: (event: SyntheticEvent<HTMLInputElement>) => void
}

export default function Input({type, placeHolder}:InputProps) {
  return (
    <div className={style.container}>
        <input type={type} className={style.input}/>
        <label className={style.label}>{placeHolder}</label>
    </div>
  )
}
