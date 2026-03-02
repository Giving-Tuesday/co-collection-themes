export interface MapFilterProps {
  availableOptions: string[];
  selectedOptions?: string[] | undefined;
  onSelect: (option: string) => void;
  className?: string | undefined;
}
