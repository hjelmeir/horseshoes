export interface FieldProps {
  name: string;
  type: string;
  label: string;
  options?: OptionsObject;
  selected?: string;
  required?: boolean;
  checked?: boolean;
  value?: string;

  validate?: (value: string) => [boolean, string];
  onValid?: () => void;
  onInvalid?: (error: string) => void;
}

export interface OptionsObject {
  [key: string]: {
    label: string;
    name?: string;
    value?: string | number;
  };
}
