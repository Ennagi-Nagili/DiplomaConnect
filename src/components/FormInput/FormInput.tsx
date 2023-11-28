export type FormInputProps = {
  label: string;
  inputType?: string;
  setValue(value: string): void;
};

const FormInput = ({ label, inputType = "text", setValue }: FormInputProps) => {
  return (
    <>
      <label>
        {label}
        <input
          // required
          type={inputType}
          placeholder={`Enter ${label}`}
          onChange={(e) => {
            setValue(e.target.value);
            console.log({setValue}, e.target.value);
          }}
        ></input>
      </label>
    </>
  );
};

export default FormInput;
