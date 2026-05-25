export default function Navbar() {
  return (
    <nav className="bg-primary text-background p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold font-sans">
        Grove International
      </div>
      <div>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-accent">Home</a></li>
          <li><a href="#" className="hover:text-accent">Shop</a></li>
          <li><a href="#" className="hover:text-accent">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
