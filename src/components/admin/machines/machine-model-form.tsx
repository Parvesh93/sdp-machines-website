"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  createMachineModel,
  type CreateMachineModelState,
} from "@/actions/machines/create-machine-model";

import { FormFieldError } from "@/components/admin/form-field-error";

type MachineModelFormProps = {
  machineId: string;
};

const initialState: CreateMachineModelState =
  {};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MachineModelForm({
  machineId,
}: MachineModelFormProps) {
  const [state, formAction, pending] =
    useActionState(
      createMachineModel,
      initialState,
    );

  const [slug, setSlug] =
    useState("");

  const [slugEdited, setSlugEdited] =
    useState(false);

  function handleModelNumberChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!slugEdited) {
      setSlug(
        createSlug(event.target.value),
      );
    }
  }

  return (
    <form
      action={formAction}
      className="admin-form"
    >
      <input
        type="hidden"
        name="machineId"
        value={machineId}
      />

      {state.error ? (
        <div className="admin-form-error">
          {state.error}
        </div>
      ) : null}

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Model information
            </h2>

            <p>
              Add a model belonging to this
              machine family.
            </p>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="name">
              Model name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="SJ-21"
            />

            <FormFieldError
              errors={
                state.fieldErrors?.name
              }
            />
          </div>

          <div className="admin-field">
            <label htmlFor="modelNumber">
              Model number
            </label>

            <input
              id="modelNumber"
              name="modelNumber"
              type="text"
              placeholder="SJ-21"
              onChange={
                handleModelNumberChange
              }
            />

            <FormFieldError
              errors={
                state.fieldErrors
                  ?.modelNumber
              }
            />
          </div>

          <div className="admin-field admin-field-full">
            <label htmlFor="slug">
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(event) => {
                setSlugEdited(true);

                setSlug(
                  createSlug(
                    event.target.value,
                  ),
                );
              }}
            />

            <FormFieldError
              errors={
                state.fieldErrors?.slug
              }
            />
          </div>

          <div className="admin-field admin-field-full">
            <label htmlFor="shortDescription">
              Short description
            </label>

            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={5}
              placeholder="Short model description..."
            />

            <FormFieldError
              errors={
                state.fieldErrors
                  ?.shortDescription
              }
            />
          </div>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Settings
            </h2>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="sortOrder">
              Sort order
            </label>

            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              min="0"
              defaultValue="0"
            />
          </div>

          <div className="admin-field admin-field-full">
            <label className="admin-checkbox">
              <input
                name="active"
                type="checkbox"
                defaultChecked
              />

              <span>
                Active model
              </span>
            </label>
          </div>
        </div>
      </section>

      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-primary-button"
          disabled={pending}
        >
          {pending
            ? "Creating..."
            : "Create model"}
        </button>
      </div>
    </form>
  );
}