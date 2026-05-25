export default function Footer() {
  return (
    <footer className="bg-primary-dark text-background p-6 mt-10">
      <div className="text-center text-sm text-text-muted">
        &copy; {new Date().getFullYear()} Grove International Uniformwear. All rights reserved.
      </div>
    </footer>
  );
}
