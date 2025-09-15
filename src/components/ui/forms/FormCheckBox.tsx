import {
  useFormContext,
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control?: Control<T>;
  description?: string;
};

const FormCheckbox = <T extends FieldValues>({
  name,
  label,
  control,
  description,
}: FormCheckboxProps<T>) => {
  const {
    control: contextControl,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors?.[name]?.message as string;

  return (
    <div className="flex items-center  gap-2">
      <Controller
        name={name}
        control={control ?? contextControl}
        render={({ field }) => (
          <input
            id={name}
            type="checkbox"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="appearance-none h-4 w-4 text-pry border border-border bg-gray-100 rounded-sm focus:ring-active focus:ring-2 focus:outline-none checked:focus:ring-border focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-pry checked:border-transparent checked:focus:ring-offset-gray-100"
          />
        )}
      />

      {label && (
        <label
          htmlFor={name}
          className="text-dark text-xs font-medium font-libre"
        >
          {label}
        </label>
      )}
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormCheckbox;
