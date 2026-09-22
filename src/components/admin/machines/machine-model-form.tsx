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
      className="grid gap-[18px]"
    >
      <input
        type="hidden"
        name="machineId"
        value={machineId}
      />

      {state.error ? (
        <div className="rounded-[5px] border border-[#eccaca] bg-[#fff3f3] px-[14px] py-3 text-[12px] text-[#9c3030]">
          {state.error}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="name">
              Model name
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px]">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="modelNumber">
              Model number
            </label>

            <input
              className="h-[42px] w-full rounded-[5px] border border-[#d9d9d4] bg-white px-3 text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="slug">
              Slug
            </label>

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

            <FormFieldError
              errors={
                state.fieldErrors?.slug
              }
            />
          </div>

          <div className="flex flex-col gap-[7px] md:col-span-2">
            <label className="text-[12px] font-semibold text-[#444444]" htmlFor="shortDescription">
              Short description
            </label>

            <textarea
              className="w-full resize-y rounded-[5px] border border-[#d9d9d4] bg-white p-3 leading-[1.6] text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]"
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

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
          <div>
            <h2>
              Settings
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[22px] p-6 md:grid-cols-2">
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

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60"
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