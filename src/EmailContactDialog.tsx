import { useRef, useState, type RefObject } from "react";
import { profile } from "./data";
import { Icon } from "./Icon";

export default function EmailContactDialog({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const addressRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email address copied.");
    } catch {
      addressRef.current?.focus();
      addressRef.current?.select();
      setStatus("Select and copy the email address above.");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="email-dialog"
      aria-labelledby="email-dialog-title"
      aria-describedby="email-dialog-description"
      onClose={() => setStatus("")}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          event.currentTarget.close();
      }}
    >
      <div className="email-dialog-heading">
        <h2 id="email-dialog-title">Let’s talk.</h2>
        <button
          type="button"
          className="icon-button"
          aria-label="Close email options"
          onClick={() => dialogRef.current?.close()}
        >
          <Icon name="close" />
        </button>
      </div>
      <p id="email-dialog-description">
        Choose how you’d like to get in touch.
      </p>
      <input
        ref={addressRef}
        className="email-address-field"
        type="text"
        aria-label="Email address"
        value={profile.email}
        readOnly
        spellCheck={false}
        onFocus={(event) => event.currentTarget.select()}
      />
      <div className="email-dialog-actions">
        <a
          className="button button-primary"
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="mail" /> Open Gmail
          <Icon name="arrow" size={16} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a className="button" href={`mailto:${profile.email}`}>
          <Icon name="mail" /> Open email app
        </a>
        <button type="button" className="button" onClick={copyAddress}>
          <Icon name={status === "Email address copied." ? "check" : "copy"} />
          {status === "Email address copied." ? "Copied" : "Copy address"}
        </button>
      </div>
      <p className="email-dialog-note">
        The email app option uses your device’s default mail application.
      </p>
      <p className="email-copy-status" role="status" aria-live="polite">
        {status}
      </p>
    </dialog>
  );
}
