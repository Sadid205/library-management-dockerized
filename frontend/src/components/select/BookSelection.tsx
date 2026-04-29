import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  genre: string;
  genreList: string[];
  onChange: (val: string) => void;
  disabled: boolean;
}

export function BookSelection({ disabled, genre, genreList, onChange }: Props) {
  // console.log(genre);

  return (
    <Select disabled={disabled} value={genre} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genre</SelectLabel>
          {genreList.map((item: string) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
