export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
