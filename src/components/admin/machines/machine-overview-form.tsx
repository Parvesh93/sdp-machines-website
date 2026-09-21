"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import {
  updateMachine,
  type UpdateMachineState,
} from "@/actions/machines/update-machine";

import { FormFieldError } from "@/components/admin/form-field-error";

type Category = {
  id: string;
  name: string;
};

type MachineData = {
  id: string;

  categoryId: string;

  name: string;
  slug: string;

  eyebrow: string | null;
  headline: string | null;
  summary: string | null;

  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

  featured: boolean;

  sortOrder: number;
};

type MachineOverviewFormProps = {
  machine: MachineData;
  categories: Category[];
};

const initialState: UpdateMachineState = {};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MachineOverviewForm({
  machine,
  categories,
}: MachineOverviewFormProps) {
  const [state, formAction, pending] =
    useActionState(
      updateMachine,
      initialState,
    );

  const [slug, setSlug] =
    useState(machine.slug);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    if (state.success) {
      setSaved(true);

      const timeout =
        window.setTimeout(() => {
          setSaved(false);
        }, 2500);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="admin-form"
    >
      <input
        type="hidden"
        name="id"
        value={machine.id}
      />

      {state.error ? (
        <div className="admin-form-error">
          {state.error}
        </div>
      ) : null}

      {saved ? (
        <div className="admin-form-success">
          Changes saved successfully.
        </div>
      ) : null}

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Machine information
            </h2>

            <p>
              Public-facing content for this
              machine family.
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
              defaultValue={
                machine.categoryId
              }
            >
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
              defaultValue={machine.name}
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
              defaultValue={
                machine.eyebrow ?? ""
              }
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
              defaultValue={
                machine.headline ?? ""
              }
            />
          </div>

          <div className="admin-field admin-field-full">
            <label htmlFor="summary">
              Summary
            </label>

            <textarea
              id="summary"
              name="summary"
              rows={6}
              defaultValue={
                machine.summary ?? ""
              }
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
              Visibility and catalogue
              placement settings.
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
              defaultValue={
                machine.status
              }
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
              defaultValue={
                machine.sortOrder
              }
            />
          </div>

          <div className="admin-field admin-field-full">
            <label className="admin-checkbox">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={
                  machine.featured
                }
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
            ? "Saving..."
            : "Save changes"}
        </button>
      </div>
    </form>
  );
}