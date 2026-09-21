type FormFieldErrorProps = {
  errors?: string[];
};

export function FormFieldError({
  errors,
}: FormFieldErrorProps) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div className="admin-field-error">
      {errors.map((error) => (
        <span key={error}>
          {error}
        </span>
      ))}
    </div>
  );
}