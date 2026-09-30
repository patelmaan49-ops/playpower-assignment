import { useState } from 'react';
import { listing } from '../data';
import { StarIcon } from '../icons';

function Review({ review }: { review: (typeof listing.reviews)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="review">
      <div className="review-head">
        {review.avatar ? (
          <img src={review.avatar} alt="" width="40" height="40" />
        ) : (
          <span className="initial">{review.name[0]}</span>
        )}
        <div>
          <div className="review-name">{review.name}</div>
          <div className="muted-text small">{review.tenure}</div>
        </div>
      </div>
      <div className="review-meta">
        <span className="stars" aria-label={`${review.stars} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} width="8" height="8" className={i < review.stars ? '' : 'dim'} />
          ))}
        </span>
        <span>·</span>
        <span>{review.when}</span>
      </div>
      <p className={open ? '' : 'clamp'}>{review.text}</p>
      {!open && (
        <button type="button" className="link-btn" onClick={() => setOpen(true)}>Show more</button>
      )}
    </article>
  );
}

export function Reviews() {
  return (
    <section className="page-wrap reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="rating-hero">
        <div className="rating-big" id="reviews-title">{listing.rating}</div>
        <div className="rating-title">Guest favourite</div>
        <p className="muted-text">This home is a guest favourite based on ratings, reviews and reliability</p>
        <a className="link-btn small" href="#reviews">How reviews work</a>
      </div>

      <div className="rating-breakdown">
        <div className="overall">
          <div className="cat-label">Overall rating</div>
          {listing.distribution.map((share, i) => (
            <div className="bar-row" key={i}>
              <span>{5 - i}</span>
              <div className="bar"><div style={{ width: `${share * 100}%` }} /></div>
            </div>
          ))}
        </div>
        {listing.ratings.map(([label, score]) => (
          <div className="cat" key={label}>
            <div className="cat-label">{label}</div>
            <div className="cat-score">{score}</div>
          </div>
        ))}
      </div>

      <div className="tag-row">
        {listing.tags.map(([emoji, label, count]) => (
          <button type="button" className="tag" key={label}>
            <span aria-hidden="true">{emoji}</span> {label} {count}
          </button>
        ))}
      </div>

      <div className="review-grid">
        {listing.reviews.map((r) => <Review key={r.name} review={r} />)}
      </div>
      <button type="button" className="outline-btn">Show all {listing.reviewCount} reviews</button>
    </section>
  );
}
