interface CustomInputProps {
  label: string;
  htmlFor?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeHolder?: string;
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
}
export default function CustomInput(props: CustomInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={props.htmlFor}
          className="block text-sm font-medium text-primary mb-2"
        >
          {props.label}
        </label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          {...(props.required ? { required: true } : {})}
          className="input-field"
          placeholder={props.placeHolder}
          value={props.defaultValue}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
