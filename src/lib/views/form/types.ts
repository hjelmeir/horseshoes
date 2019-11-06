export interface FieldProps {
  name: string;
  type: string;
  label: string;
  options?: OptionsObject;
  selected?: string;
  required?: boolean;
  checked?: boolean;
  value?: string;
  valid?: boolean;

  normalize?: (value: string) => string;
  validate?: (value: string) => [boolean, string];
  onValidate?: (value: boolean) => void;
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

export interface RadioFieldProps extends FieldProps {
  type: 'toggle' | 'group' | 'tabs';
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

export interface SelectFieldProps extends FieldProps {
  type: 'select';
  multiple?: boolean;
  searchable?: boolean;
  onChange?: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
  selectHandler?: (v: string[]) => void;
  selectedValues?: string[];
}

export interface TextAreaFieldProps extends FieldProps {
  type: 'textarea';
  onChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}

export interface TextFieldProps extends FieldProps {
  type: 'text' | 'email' | 'password';
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
