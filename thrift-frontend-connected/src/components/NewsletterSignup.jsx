export default function NewsletterSignup() {
  return (
    <div className="newsletter">
      <div>
        <div style={{ fontWeight: 900, fontSize: "1.05rem" }}>Newsletter</div>
        <div className="muted small">Get drops, promos, and free-shipping alerts.</div>
      </div>
      <form
        className="newsForm"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Demo: newsletter subscribed.");
        }}
      >
        <input className="input" placeholder="Email address" type="email" required />
        <button className="btnPrimary" type="submit">Subscribe</button>
      </form>
    </div>
  );
}
