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
    <div className="grid gap-[3px] text-[11px] text-[#b13a3a]">
      {errors.map((error) => (
        <span key={error}>{error}</span>
      ))}
    </div>
  );
}
