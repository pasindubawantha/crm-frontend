import sortOrderEnum from '../types/enums/sortOrderEnum'

interface SortButtonProps {
  sortByArray: any
  onClick: any
  field: string,
  fieldLabel: string
}

interface FieldSortOrder {
  field: string,
  sort_order: string
}

export default function SortButton({ sortByArray, onClick, field, fieldLabel }: SortButtonProps) {
  var sortOrder: string = sortOrderEnum.NONE;
  let fieldSortOrderObject: FieldSortOrder = sortByArray.find((object: FieldSortOrder) => object.field === field);
  
  if (fieldSortOrderObject) sortOrder = fieldSortOrderObject.sort_order;

  switch(sortOrder) {
    case sortOrderEnum.NONE:
      return (
        <div
          className="custom-tooltip"
          onClick={()=>{
            onClick((previousState: any) => {
              return [
                {
                  field: field,
                  sort_order: sortOrderEnum.ASCENDING
                },
                ...previousState
              ]
            })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
          </svg>

          <span className="custom-tooltiptext">Sort ascending by {fieldLabel}</span>

        </div>
      )

    case sortOrderEnum.ASCENDING:
      return (
        <div
          className="custom-tooltip"
          onClick={()=>{
            onClick((previousState: any) => {
              let newState = [...previousState]
              newState = newState.filter(object => object.field != field);
    
              return [ 
                {
                  field: field,
                  sort_order: sortOrderEnum.DESCENDING
                },
                ...newState
              ]
            })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>

          <span className="custom-tooltiptext">Sort decending by {fieldLabel}</span>

        </div>
      )

    case sortOrderEnum.DESCENDING:
      return (
        <div
          className="custom-tooltip"
          onClick={()=>{
            onClick((previousState: any) => {
              let newState = [...previousState]
              return newState.filter(object => object.field != field);
            })
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
          </svg>

          <span className="custom-tooltiptext">Remove sort by {fieldLabel}</span>

        </div>
      )

    default:
      return <></>
  }

}
