import { CalendarIcon, RulesIcon, ShieldIcon } from '../icons';

export function ThingsToKnow() {
  return (
    <section className="page-wrap block know">
      <h2>Things to know</h2>
      <div className="know-grid">
        <div>
          <CalendarIcon width="24" height="24" />
          <h3>Cancellation policy</h3>
          <p>Add your trip dates to get the cancellation details for this stay.</p>
          <button type="button" className="link-btn">Add dates</button>
        </div>
        <div>
          <RulesIcon width="24" height="24" />
          <h3>House rules</h3>
          <p>Check-in after 2:00pm</p>
          <p>Checkout before 11:00 am</p>
          <p>3 guests maximum</p>
          <button type="button" className="link-btn">Learn more</button>
        </div>
        <div>
          <ShieldIcon width="24" height="24" />
          <h3>Safety &amp; property</h3>
          <p>Carbon monoxide alarm not reported</p>
          <p>Smoke alarm not reported</p>
          <p>Exterior security cameras on property</p>
          <button type="button" className="link-btn">Learn more</button>
        </div>
      </div>
    </section>
  );
}
