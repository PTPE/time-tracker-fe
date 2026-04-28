import Select from "@/ui/Select";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

export default function ProjectSelect({
  options,
  onChange,
  defaultValue,
}: Props) {
  return (
    <div className="bg-surface-secondary w-full">
      <Select
        options={options}
        onChange={onChange}
        placeholder="Choose a project..."
        defaultValue={defaultValue}
      />
    </div>
  );
}
