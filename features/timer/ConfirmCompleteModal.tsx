import { completeWorklog } from "@/types/worklog";
import Button from "@/ui/Button";
import Modal, { ModalRef } from "@/ui/Modal";
import useCompleteWorklog from "@/hooks/timer/useCompleteWorklog";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Input from "@/ui/Input";

type Props = {
  ref: RefObject<ModalRef | null>;
  finishedAt: number;
  startedAt?: number;
  projectName: string;
  pauseDuration?: number;
  projectId: string;
};

function timestampToDatetimeInput(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(
    2,
    "0",
  )}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function ConfirmCompleteModal({
  ref,
  startedAt,
  pauseDuration,
  finishedAt,
  projectName,
  projectId,
}: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(completeWorklog),
  });

  const { mutate: saveWorkLog } = useCompleteWorklog();

  const actualWorkHours = Math.round(
    (finishedAt - (startedAt ?? 0) - (pauseDuration ?? 0) * 1000) / 3600000,
  );

  const onSubmit = (data: z.infer<typeof completeWorklog>) => {
    saveWorkLog({
      projectId,
      finishedAt: data.finishedAt,
      completedLength: data.completedLength,
      notes: data.notes || "",
    });
  };

  useEffect(
    () =>
      reset({
        finishedAt,
      }),
    [reset, finishedAt],
  );

  return (
    <Modal ref={ref}>
      <div className="border-border-default flex items-center justify-between border-b p-6">
        <div className="text-text-primary text-xl">Session Summary</div>
        <div
          className="text-foreground-tertiary hover:text-danger cursor-pointer text-2xl font-bold"
          onClick={() => ref?.current?.onClose()}
        >
          ×
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 p-6">
        <div className="col-span-2">
          <Input label="Project" readOnly value={projectName} />
        </div>

        <Input
          type="datetime-local"
          label="Start Time"
          isRequired
          value={timestampToDatetimeInput(startedAt || new Date().getTime())}
          readOnly
        />

        <Controller
          control={control}
          name="finishedAt"
          render={({ field }) => (
            <Input
              type="datetime-local"
              label="End Time"
              isRequired
              value={timestampToDatetimeInput(field.value)}
              readOnly
            />
          )}
        />

        <div className="col-span-2">
          <Input
            label="Pause Duration (hr)"
            readOnly
            value={Math.round((pauseDuration ?? 0) / 3600)}
          />
        </div>

        <div className="col-span-2">
          <Input
            label="Actual Work Hours(hr)"
            readOnly
            value={actualWorkHours}
          />
        </div>

        <div className="col-span-2">
          <Input
            {...register("completedLength", {
              valueAsNumber: true,
            })}
            label="Completed Duration(hr)"
            isRequired
            isError={Boolean(errors.completedLength)}
            errorMessage={errors.completedLength?.message}
          />
        </div>

        <div className="col-span-2">
          <Input
            {...register("notes")}
            label="Notes(optional)"
            isError={Boolean(errors.notes)}
            errorMessage={errors.notes?.message}
            isTextArea
          />
        </div>
      </div>

      <div className="bg-surface-secondary border-border-default sticky bottom-0 flex h-20 items-center justify-between gap-3 border-t p-6">
        <Button
          className="bg-teal text-surface-secondary h-fit flex-1"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          className="border-border-default h-fit border"
          onClick={() => ref?.current?.onClose()}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
