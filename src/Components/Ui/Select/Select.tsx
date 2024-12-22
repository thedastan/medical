import "./style.css";

interface IoptionTypes {
  value: string;
  name: string;
}

interface ISelect {
  defaultValue: string;
  value: string;
  options: IoptionTypes[];
  onChange: (value: string) => void;
}

export default function Select({
  options,
  defaultValue,
  value,
  onChange,
}: ISelect) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{defaultValue}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
