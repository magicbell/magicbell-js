import React from 'react';

interface Props {
  id: string;
  label?: string | React.ReactNode;
  value?: boolean;
  onClick: (value: boolean) => void;
}

/**
 * Toggle input.
 *
 * @example
 * <ToggleInput label="Enable notifications" value={false} onClick={toggleNotifications} />
 */
export default function ToggleInput({ id, label, value = false, onClick }: Props) {
  const handleClick = () => {
    onClick(!value);
  };

  return (
    <div>
      {label ? (
        <label htmlFor={id} style={{ marginRight: '14px' }}>
          {label}
        </label>
      ) : null}
      <input id={id} type="checkbox" onClick={handleClick} defaultChecked={value} />
    </div>
  );
}
