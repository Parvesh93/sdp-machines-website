"use client";

import {
  useActionState,
  useState,
} from "react";

import {
  createMachine,
  type CreateMachineState,
} from "@/actions/machines/create-machine";

import { FormFieldError } from "@/components/admin/form-field-error";

type Category = {
  id: string;
  name: string;
};

type MachineFormProps = {
  categories: Category[];
};

const initialState: CreateMachineState = {};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MachineForm({
  categories,
}: MachineFormProps) {
  const [state, formAction, pending] =
    useActionState(
      createMachine,
      initialState,
    );

  const [slug, setSlug] =
    useState("");

  const [slugEdited, setSlugEdited] =
    useState(false);

  function handleNameChange(
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
      {state.error ? (
        <div className="admin-form-error">
          {state.error}
        </div>
      ) : null}

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Basic information
            </h2>

            <p>
              Core information used throughout
              the machine catalogue.
            </p>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="categoryId">
              Category
            </label>

            <select
              id="categoryId"
              name="categoryId"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Select category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ),
              )}
            </select>

            <FormFieldError
              errors={
                state.fieldErrors
                  ?.categoryId
              }
            />
          </div>

          <div className="admin-field">
            <label htmlFor="name">
              Machine name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: Automatic Cutting Machine"
              onChange={handleNameChange}
            />

            <FormFieldError
              errors={
                state.fieldErrors?.name
              }
            />
          </div>

          <div className="admin-field admin-field-full">
            <label htmlFor="slug">
              URL slug
            </label>

            <div className="admin-slug-input">
              <span>
                /machines/
              </span>

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
            </div>

            <FormFieldError
              errors={
                state.fieldErrors?.slug
              }
            />
          </div>

          <div className="admin-field">
            <label htmlFor="eyebrow">
              Eyebrow
            </label>

            <input
              id="eyebrow"
              name="eyebrow"
              type="text"
              placeholder="Precision engineering"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="headline">
              Headline
            </label>

            <input
              id="headline"
              name="headline"
              type="text"
              placeholder="Built for continuous production"
            />
          </div>

          <div className="admin-field admin-field-full">
            <label htmlFor="summary">
              Summary
            </label>

            <textarea
              id="summary"
              name="summary"
              rows={5}
              placeholder="Short introduction shown on the machine page..."
            />

            <FormFieldError
              errors={
                state.fieldErrors
                  ?.summary
              }
            />
          </div>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Publishing
            </h2>

            <p>
              Control machine visibility and
              catalogue ordering.
            </p>
          </div>
        </div>

        <div className="admin-form-grid">
          <div className="admin-field">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue="DRAFT"
            >
              <option value="DRAFT">
                Draft
              </option>

              <option value="PUBLISHED">
                Published
              </option>

              <option value="ARCHIVED">
                Archived
              </option>
            </select>
          </div>

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
                name="featured"
                type="checkbox"
              />

              <span>
                Feature this machine
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
            : "Create machine"}
        </button>
      </div>
    </form>
  );
}