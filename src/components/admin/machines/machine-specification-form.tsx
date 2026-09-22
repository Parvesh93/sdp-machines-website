"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createMachineSpecification,
  type CreateMachineSpecificationState,
} from "@/actions/machines/create-machine-specification";
import { FormFieldError } from "@/components/admin/form-field-error";

type MachineSpecificationFormProps = {
  machineId: string;
  machineModelId: string;
};

const initialState: CreateMachineSpecificationState = {};

const inputClass = "h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]";

export function MachineSpecificationForm({
  machineId,
  machineModelId,
}: MachineSpecificationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    createMachineSpecification,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const fields = [
    { name: "groupName", label: "Group", type: "text", placeholder: "Cutting" },
    { name: "label", label: "Specification", type: "text", placeholder: "Number of Blades", required: true },
    { name: "value", label: "Value", type: "text", placeholder: "21", required: true },
    { name: "unit", label: "Unit", type: "text", placeholder: "blades" },
    { name: "sortOrder", label: "Order", type: "number", placeholder: "", defaultValue: "10" },
  ] as const;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-[18px]"
    >
      <input type="hidden" name="machineId" value={machineId} />
      <input type="hidden" name="machineModelId" value={machineModelId} />

      {state.error ? (
        <div className="rounded-[5px] border border-[#eccaca] bg-[#fff3f3] px-[14px] py-3 text-[12px] text-[#9c3030]">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="rounded-[5px] border border-[#c9e2ce] bg-[#eff8f1] px-[14px] py-3 text-[12px] text-[#296436]">
          Specification added successfully.
        </div>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(130px,0.8fr)_minmax(260px,1.8fr)_minmax(110px,0.7fr)_minmax(100px,0.6fr)_80px]">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label
              htmlFor={field.name}
              className="text-[11px] font-semibold text-[#55554f]"
            >
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={"required" in field ? field.required : undefined}
              min={field.type === "number" ? "0" : undefined}
              defaultValue={"defaultValue" in field ? field.defaultValue : undefined}
              className={inputClass}
            />

            <FormFieldError
              errors={state.fieldErrors?.[field.name]}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60 min-w-[170px]"
          disabled={pending}
        >
          {pending ? "Adding..." : "Add specification"}
        </button>
      </div>
    </form>
  );
}
