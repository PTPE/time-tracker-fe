import { cn } from "@/utils/cn";

type InputProps = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isTextArea?: false;
  isError?: boolean;
  errorMessage?: string;
  containerClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isTextArea: true;
  isError?: boolean;
  errorMessage?: string;
  containerClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = InputProps | TextareaProps;

const fieldBase =
  "w-full rounded-2xl border p-3 text-text-primary transition-colors duration-200 outline-none placeholder:text-text-tertiary";

export default function Input({
  label,
  placeholder,
  errorMessage,
  isTextArea = false,
  isRequired = false,
  isError = false,
  containerClassName,
  ...props
}: Props) {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label className="text-text-secondary text-sm">
          {label} {isRequired && <span className="text-red">*</span>}
        </label>
      )}
      {isTextArea ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          placeholder={placeholder}
          className={cn(
            fieldBase,
            "bg-input-background",
            isError ? "border-red" : "border-border-default focus:border-teal",
            (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)
              .className,
          )}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          placeholder={placeholder}
          className={cn(
            fieldBase,
            "bg-input-background read-only:bg-surface-primary",
            isError ? "border-red" : "border-border-default focus:border-teal",
            (props as React.InputHTMLAttributes<HTMLInputElement>).className,
          )}
        />
      )}
      {isError && <p className="text-red text-sm">{errorMessage}</p>}
    </div>
  );
}
