import customerStatusEnum from '../types/enums/customerStatusEnum'

interface CustomerStatusProps {
  status: string
}

export default function CustomerStatus({ status }: CustomerStatusProps) {
  switch(status)
  {
    case customerStatusEnum.ACTIVE:
      return (
        <span className="badge text-bg-primary m-2">
          {status}
        </span>
        )
    case customerStatusEnum.NON_ACTIVE:
      return (
        <span className="badge text-bg-danger m-2">
          {status}
        </span>
        )
    case customerStatusEnum.LEAD:
      return (
        <span className="badge text-bg-success m-2">
          {status}
        </span>
        )
    default:
      return <></>
  }
  
}
