import type { HTMLAttributes } from 'preact';

import './toggle-switch.css';

interface ToggleSwitchProps extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <label class="toggle-switch">
      <input type="checkbox" class="toggle-switch__input" checked={props.checked} {...props} />
      <span class="toggle-switch__track">
        <span class="toggle-switch__track-thumb" />
      </span>
      {props.label && <span class="toggle-switch__label">{props.label}</span>}
    </label>
  );
}
