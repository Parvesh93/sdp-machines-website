"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import {
  createMachineSpecification,
  type CreateMachineSpecificationState,
} from "@/actions/machines/create-machine-specification";

import { FormFieldError } from "@/components/admin/form-field-error";

type MachineSpecificationFormProps = {
  machineId: string;
  machineModelId: string;
};

const initialState:
  CreateMachineSpecificationState = {};

export function MachineSpecificationForm({
  machineId,
  machineModelId,
}: MachineSpecificationFormProps) {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    createMachineSpecification,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="specification-form"
    >
      <input
        type="hidden"
        name="machineId"
        value={machineId}
      />

      <input
        type="hidden"
        name="machineModelId"
        value={machineModelId}
      />

      {state.error ? (
        <div className="admin-form-error">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="admin-form-success">
          Specification added successfully.
        </div>
      ) : null}

      <div className="specification-form-grid">
        <div className="admin-field">
          <label htmlFor="groupName">
            Group
          </label>

          <input
            id="groupName"
            name="groupName"
            type="text"
            placeholder="Cutting"
          />

          <FormFieldError
            errors={
              state.fieldErrors?.groupName
            }
          />
        </div>

        <div className="admin-field">
          <label htmlFor="label">
            Specification
          </label>

          <input
            id="label"
            name="label"
            type="text"
            placeholder="Number of Blades"
            required
          />

          <FormFieldError
            errors={
              state.fieldErrors?.label
            }
          />
        </div>

        <div className="admin-field">
          <label htmlFor="value">
            Value
          </label>

          <input
            id="value"
            name="value"
            type="text"
            placeholder="21"
            required
          />

          <FormFieldError
            errors={
              state.fieldErrors?.value
            }
          />
        </div>

        <div className="admin-field">
          <label htmlFor="unit">
            Unit
          </label>

          <input
            id="unit"
            name="unit"
            type="text"
            placeholder="blades"
          />

          <FormFieldError
            errors={
              state.fieldErrors?.unit
            }
          />
        </div>

        <div className="admin-field">
          <label htmlFor="sortOrder">
            Order
          </label>

          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min="0"
            defaultValue="10"
          />

          <FormFieldError
            errors={
              state.fieldErrors?.sortOrder
            }
          />
        </div>
      </div>

      <div className="specification-form-actions">
        <button
          type="submit"
          className="admin-primary-button"
          disabled={pending}
        >
          {pending
            ? "Adding..."
            : "Add specification"}
        </button>
      </div>
    </form>
  );
}