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
      className="grid gap-[18px]"
    >
      <input
        type="hidden"
        name="id"
        value={machine.id}
      />

      {state.error ? (
        <div className="rounded-[5px] border border-[#eccaca] bg-[#fff3f3] px-[14px] py-3 text-[12px] text-[#9c3030]">
          {state.error}
        </div>
      ) : null}

      {saved ? (
        <div className="rounded-[5px] border border-[#c9e2ce] bg-[#eff8f1] px-[14px] py-3 text-[12px] text-[#296436]">
          Changes saved successfully.
        </div>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="categoryId">
              Category
            </label>

            <select
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="name">
              Machine name
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="slug">
              URL slug
            </label>

            <div className="flex items-center overflow-hidden rounded-[5px] border border-[#d9d9d4]"><span className="whitespace-nowrap pl-3 text-[12px] text-[#999999]">
                /machines/
              </span>

              <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="eyebrow">
              Eyebrow
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
              id="eyebrow"
              name="eyebrow"
              type="text"
              defaultValue={
                machine.eyebrow ?? ""
              }
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="headline">
              Headline
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
              id="headline"
              name="headline"
              type="text"
              defaultValue={
                machine.headline ?? ""
              }
            />
          </div>

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="summary">
              Summary
            </label>

            <textarea
              className="w-full resize-y rounded-[5px] border border-[#d9d9d4] bg-white p-3 leading-[1.6] text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="status">
              Status
            </label>

            <select
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="sortOrder">
              Sort order
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
              id="sortOrder"
              name="sortOrder"
              type="number"
              min="0"
              defaultValue={
                machine.sortOrder
              }
            />
          </div>

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="inline-flex cursor-pointer flex-row items-center gap-[9px] text-[12px] font-semibold text-[#444444]">
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

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60"
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