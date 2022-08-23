import oppotunityStatusEnum from '../types/enums/oppotunityStatusEnum';

interface OpportunityStatusProps {
  status: string
}

export default function OpportunityStatus({ status }: OpportunityStatusProps) {
  switch(status) {
    case oppotunityStatusEnum.NEW:
      return (
        <span className="badge text-bg-primary m-2">
          {status}
        </span>
      )
    case oppotunityStatusEnum.CLOSED_WON:
      return (
        <span className="badge text-bg-success m-2">
          {status}
        </span>
      )
    case oppotunityStatusEnum.CLOSED_LOST:
      return (
        <span className="badge text-bg-danger m-2">
          {status}
        </span>
      )
    default:
      return <></>
  }
}
