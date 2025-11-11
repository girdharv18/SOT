export default function Footer() {
  return (
    <div className="FOOTER mt-[60px] max-w-[1350px] mx-auto border-t border-[hsl(0,0%,75%)] flex items-center justify-between px-[40px] py-[10px]">
      <div className="COMPANY-LOGO">
        <img
          src="/images/footer/company_logo.png"
          alt="Company Logo"
          className="w-[200px]"
        />
      </div>

      <div className="LINKS">
        <div className="LINKS-ITEM">
          <h3 className="LINKS-ITEM-TITLE">Links</h3>
          <ul className="LINKS-ITEM-LIST">
            <li className="LINKS-ITEM-LIST-ITEM">
              <a href="/" className="LINKS-ITEM-LIST-ITEM-LINK">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
