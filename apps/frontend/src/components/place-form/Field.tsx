import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./PlaceForm.module.scss";

/** ids that tie a field to its help and error text (aria-describedby). */
export function fieldIds(name: string) {
  return {
    input: `field-${name}`,
    help: `field-${name}-help`,
    error: `field-${name}-error`,
  };
}

export function describedBy(
  name: string,
  hasHelp: boolean,
  error: string | undefined,
) {
  const ids = fieldIds(name);
  return (
    [hasHelp && ids.help, error && ids.error].filter(Boolean).join(" ") ||
    undefined
  );
}

/** Error under a field: red text with an icon, never colour alone (standard). */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={styles.error}>
      <Icon name="alert-circle-outline" size={20} />
      <span>{message}</span>
    </p>
  );
}

type TextFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  error?: string;
  /** Shows "12 / 80" under the field. */
  limit?: number;
  multiline?: boolean;
  optional?: boolean;
};

/** TextField / TextArea (standard): the label is always visible, help right under it. */
export function TextField({
  name,
  label,
  value,
  onChange,
  help,
  error,
  limit,
  multiline,
  optional,
}: TextFieldProps) {
  const ids = fieldIds(name);
  const props = {
    id: ids.input,
    value,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(name, Boolean(help), error),
    className: `${styles.input} ${error ? styles.invalid : ""}`,
  };
  const count = value.trim().length;
  return (
    <div className={styles.field}>
      <label htmlFor={ids.input} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {help && (
        <p id={ids.help} className={styles.help}>
          {help}
        </p>
      )}
      {multiline ? (
        <textarea
          {...props}
          rows={6}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...props}
          type="text"
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      <div className={styles.under}>
        <FieldError id={ids.error} message={error} />
        {limit && (
          <span
            className={`${styles.count} ${count > limit ? styles.over : ""}`}
          >
            {count} / {limit}
          </span>
        )}
      </div>
    </div>
  );
}

type ChoiceProps<T extends string> = {
  name: string;
  legend: string;
  options: { value: T; label: string; icon?: ReactNode }[];
  help?: string;
  error?: string;
  optional?: boolean;
} & (
  | { multiple?: false; value: T | ""; onChange: (value: T) => void }
  | { multiple: true; value: T[]; onChange: (value: T[]) => void }
);

/** Radio or checkbox group as chips: selected = thick border + check icon, not colour alone. */
export function ChoiceGroup<T extends string>(props: ChoiceProps<T>) {
  const { name, legend, options, help, error, optional } = props;
  const ids = fieldIds(name);
  const isOn = (value: T) =>
    props.multiple ? props.value.includes(value) : props.value === value;
  const toggle = (value: T) => {
    if (props.multiple) {
      props.onChange(
        props.value.includes(value)
          ? props.value.filter((v) => v !== value)
          : [...props.value, value],
      );
    } else {
      props.onChange(value);
    }
  };
  return (
    <fieldset
      id={ids.input}
      className={styles.field}
      aria-describedby={describedBy(name, Boolean(help), error)}
      tabIndex={-1}
    >
      <legend className={styles.label}>
        {legend}
        {optional && <span className={styles.optional}> (optional)</span>}
      </legend>
      {help && (
        <p id={ids.help} className={styles.help}>
          {help}
        </p>
      )}
      <div className={styles.choices}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${styles.choice} ${isOn(option.value) ? styles.on : ""}`}
          >
            <input
              type={props.multiple ? "checkbox" : "radio"}
              name={name}
              value={option.value}
              checked={isOn(option.value)}
              onChange={() => toggle(option.value)}
              className="visually-hidden"
            />
            {isOn(option.value) ? (
              <Icon name="checkmark-circle-outline" size={20} />
            ) : (
              option.icon
            )}
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError id={ids.error} message={error} />
    </fieldset>
  );
}

/** 1–5 stars as a radio group: "4 out of 5" is a real choice for keyboards and readers. */
export function RatingField({
  name,
  legend,
  help,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  help?: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}) {
  const ids = fieldIds(name);
  return (
    <fieldset
      id={ids.input}
      className={styles.field}
      aria-describedby={describedBy(name, Boolean(help), error)}
      tabIndex={-1}
    >
      <legend className={styles.label}>{legend}</legend>
      {help && (
        <p id={ids.help} className={styles.help}>
          {help}
        </p>
      )}
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={styles.star}>
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="visually-hidden"
            />
            <Icon name={n <= value ? "star" : "star-outline"} size={32} />
            <span className="visually-hidden">{n} out of 5</span>
          </label>
        ))}
        <span className={styles.starsValue} aria-hidden="true">
          {value ? `${value} / 5` : ""}
        </span>
      </div>
      <FieldError id={ids.error} message={error} />
    </fieldset>
  );
}
