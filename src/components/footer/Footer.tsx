import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer flex h-100">
      <p>Copyright &copy; {new Date().getFullYear()} - All right reserved</p>
    </footer>
  )
}