interface FilterAnyInputProps {
  label: string,
  children: React.ReactNode
}

export default function FilterAnyInput({ children, label }: FilterAnyInputProps) {
  return (
    <div className='col-12'>
      <label className="form-label">{label}</label>
        {children}
    </div>
  )
}
