export default function Footer() {
  const today = new Date()
  return (  
  <footer className="pt-4 my-md-5 pt-md-5 border-top">
    <div className="row">
      <div className="col-12 col-md">
        <small className="d-block mb-3 text-muted">Pasindu Perera © {today.getFullYear()}</small>
      </div>
    </div>
  </footer>
  )
}

