"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CALENDAR_WEEKS, EVENT_DATE, INVITATION } from "../config/invitation";
import { Countdown } from "./countdown";
import { InvitePhoto } from "./invite-photo";

type RsvpChoice = "жалгыз" | "бирге" | "келе албайм" | null;

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <span className="ornament__gem" />
      <span />
    </div>
  );
}

export function Invitation() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [rsvp, setRsvp] = useState<RsvpChoice>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { couple, photos } = INVITATION;
  const photoAlt = `${couple[0]} жана ${couple[1]}`;

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    }
  }, [musicPlaying]);

  const handleOpen = () => {
    setOpened(true);
    audioRef.current
      ?.play()
      .then(() => setMusicPlaying(true))
      .catch(() => {});
  };

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  async function handleRsvpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rsvp || !name.trim()) return;

    await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rsvp,
      }),
    });

    setSubmitted(true);
  }

  return (
    <div className={`wedding${opened ? " wedding--open" : ""}`}>
      <audio ref={audioRef} src={INVITATION.music} loop preload="none" />

      {/* Cover */}
      <section className="cover" aria-hidden={opened ? true : undefined}>
        <div className="cover__media">
          <InvitePhoto
            src={photos.cover}
            alt={photoAlt}
            className="cover__img"
          />
          <div className="cover__veil" />
        </div>
        <div className="cover__body">
          <p className="cover__tag">Тойго чакыруу</p>
          <h1 className="cover__names">
            <span>{couple[0]}</span>
            <span className="cover__and">&</span>
            <span>{couple[1]}</span>
          </h1>
          <p className="cover__date">
            {INVITATION.day}.{INVITATION.monthNum}.{INVITATION.year}
          </p>
          <button type="button" className="cover__open" onClick={handleOpen}>
            Чакырууну ачуу
          </button>
        </div>
      </section>

      <main className="wedding__main">
        {/* Hero */}
        <header className="hero">
          <div className="hero__media">
            <InvitePhoto
              src={photos.cover}
              alt={photoAlt}
              className="hero__img"
            />
            <div className="hero__fade" />
          </div>
          <div className="hero__text">
            <p className="hero__tag">{INVITATION.title}</p>
            <h1 className="hero__names">
              {couple[0]} <em>&</em> {couple[1]}
            </h1>
            <p className="hero__when">
              {INVITATION.day} {INVITATION.month} · {INVITATION.time}
            </p>
          </div>
        </header>

        {/* Invitation */}
        <section className="block">
          <Ornament />
          <div className="card">
            <p className="card__label">Урматтуу коноктор</p>
            <p className="card__lead">Сиздерди балдарыбыз</p>
            <h2 className="card__title">{INVITATION.coupleGenitive}</h2>
            <p className="card__text">{INVITATION.invitationText}</p>
            <p className="card__hosts">
              Той ээлери — {INVITATION.hosts[0]} & {INVITATION.hosts[1]}
            </p>
          </div>
        </section>

        {/* Featured photo */}
        {/* <section className="feature-photo">
          <div className="feature-photo__frame">
            <InvitePhoto
              src={photos.cover}
              alt={photoAlt}
              className="feature-photo__img"
              sizes="(max-width: 440px) 88vw, 400px"
            />
          </div>
          {photos.second && (
            <div className="feature-photo__frame feature-photo__frame--alt">
              <InvitePhoto
                src={photos.second}
                alt="Биздин сүрөт"
                className="feature-photo__img"
                sizes="(max-width: 440px) 72vw, 320px"
              />
            </div>
          )}
        </section> */}

        {/* Countdown */}
        <section className="block block--dark">
          <p className="block__eyebrow">Убакыт</p>
          <h2 className="block__heading">Тойго калган убакыт</h2>
          <Countdown targetDate={EVENT_DATE} />
        </section>

        {/* Date */}
        <section className="block block--soft">
          <Ornament />
          <p className="block__eyebrow">Күнү</p>
          <div className="date-block">
            <span className="date-block__num">{INVITATION.day}</span>
            <div className="date-block__info">
              <span>{INVITATION.month}</span>
              <span>{INVITATION.year}</span>
              <span>{INVITATION.time}</span>
            </div>
          </div>
          <div className="calendar">
            <div className="calendar__grid">
              {["Жк", "Дш", "Ше", "Ша", "Бш", "Жм", "Иш"].map((d) => (
                <span key={d} className="calendar__head">
                  {d}
                </span>
              ))}
              {CALENDAR_WEEKS.flat().map((day, i) =>
                day === "" ? (
                  <span key={`e-${i}`} className="calendar__empty" aria-hidden />
                ) : (
                  <b
                    key={`d-${i}`}
                    className={
                      day === INVITATION.day ? "calendar__today" : undefined
                    }
                  >
                    {day}
                  </b>
                ),
              )}
            </div>
          </div>
          <p className="block__note">
            {INVITATION.weekday} · {INVITATION.year}-жыл
          </p>
        </section>

        {/* Venue */}
        <section className="block">
          <Ornament />
          <p className="block__eyebrow">Дареги</p>
          <div className="card card--venue">
            <h3 className="venue__name">{INVITATION.venue}</h3>
            <p className="venue__city">{INVITATION.city}</p>
            <p className="venue__addr">{INVITATION.address}</p>
            <p className="venue__note">
              Сиздерди {INVITATION.day}-июль күнү саат {INVITATION.time}дө
              күтөбүз.
            </p>
            <div className="venue__actions">
              <a
                href={INVITATION.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--fill"
              >
                Картадан кароо
              </a>
              <a
                href={INVITATION.taxiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--line"
              >
                Такси чакыруу
              </a>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="block block--soft">
          <p className="block__eyebrow">Программа</p>
          <h2 className="block__heading block__heading--dark">
            Той программасы
          </h2>
          <ol className="schedule">
            {INVITATION.timeline.map((item) => (
              <li key={item.time} className="schedule__item">
                <time className="schedule__time">{item.time}</time>
                <div>
                  <h3 className="schedule__title">{item.title}</h3>
                  <p className="schedule__desc">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Dress code */}
        <section className="block">
          <Ornament />
          <p className="block__eyebrow">Кийим</p>
          <p className="block__text">{INVITATION.dressCode}</p>
        </section>

        {/* RSVP */}
        <section className="block block--soft">
          <p className="block__eyebrow">Жооп</p>
          <h2 className="block__heading block__heading--dark">
            Тойго келесизби?
          </h2>

          {submitted ? (
            <p className="rsvp-done">
              Рахмат! Жообуңузду алдык. Сизди тойдо күтөбүз!
            </p>
          ) : (
            <form className="rsvp" onSubmit={handleRsvpSubmit}>
              {(
                [
                  { value: "жалгыз", label: "Ооба, жалгыз келем" },
                  { value: "бирге", label: "Ооба, бирге келебиз" },
                  { value: "келе албайм", label: "Тилекке каршы, келе албайм" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`rsvp__opt${rsvp === opt.value ? " rsvp__opt--on" : ""}`}
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value={opt.value}
                    checked={rsvp === opt.value}
                    onChange={() => setRsvp(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}

              {rsvp === "бирге" && (
                <div className="rsvp__stepper">
                  <span>Канча адам?</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(2, g - 1))}
                      aria-label="Азайтуу"
                    >
                      −
                    </button>
                    <strong>{guests}</strong>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(6, g + 1))}
                      aria-label="Көбөйтүү"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <input
                className="rsvp__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Атыңыз"
                required
              />
              <button
                type="submit"
                className="btn btn--fill btn--wide"
                disabled={!rsvp || !name.trim() || submitting}
              >
                {submitting ? "Жиберилүүдө..." : "Жиберүү"}
              </button>
            </form>
          )}
        </section>

        <footer className="footer">
          <p className="footer__with">Урматтоо менен,</p>
          <p className="footer__names">
            {couple[0]} <em>&</em> {couple[1]}
          </p>
          <p className="footer__meta">
            {INVITATION.title} · {INVITATION.year}
          </p>
        </footer>
      </main>

      {opened && (
        <button
          type="button"
          className={`music-btn${musicPlaying ? " music-btn--on" : ""}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Музыканы токтотуу" : "Музыканы ойнотуу"}
        >
          <span className="music-btn__bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="music-btn__play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
