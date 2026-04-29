import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  isAvailable: true | false;
  onChange: (val: "true" | "false") => void;
  disabled: boolean;
}

export function IsAvailableRadio({ isAvailable, onChange, disabled }: Props) {
  return (
    <RadioGroup
      disabled={disabled}
      defaultValue={String(isAvailable)}
      onValueChange={onChange}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="true" id="available" />
        <Label htmlFor="available">Available</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="false" id="unavailable" />
        <Label htmlFor="unavailable">Unavailable</Label>
      </div>
    </RadioGroup>
  );
}
