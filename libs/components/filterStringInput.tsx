import { ChangeEventHandler } from 'react'
import FilterAnyInput from './filterAnyInput'

interface FilterStringInputProps {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeHolder: string
}

export default function FilterStringInput({ label, onChange, placeHolder, value }: FilterStringInputProps) {

  return (
    <FilterAnyInput label={label}>
      <input
          value={value}
          onChange={onChange}
          type="text"
          className="form-control"
          placeholder={placeHolder}
        />
    </FilterAnyInput>
  )

}

