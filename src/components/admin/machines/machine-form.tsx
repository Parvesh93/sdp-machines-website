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
      className="grid gap-[18px]"
    >
      {state.error ? (
        <div className="rounded-[5px] border border-[#eccaca] bg-[#fff3f3] px-[14px] py-3 text-[12px] text-[#9c3030]">
          {state.error}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="categoryId">
              Category
            </label>

            <select
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="name">
              Machine name
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="eyebrow">
              Eyebrow
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
              id="eyebrow"
              name="eyebrow"
              type="text"
              placeholder="Precision engineering"
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
              placeholder="Built for continuous production"
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

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="status">
              Status
            </label>

            <select
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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
              defaultValue="0"
            />
          </div>

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="inline-flex cursor-pointer flex-row items-center gap-[9px] text-[12px] font-semibold text-[#444444]">
              <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60"
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